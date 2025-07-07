import { 
  ref, 
  push, 
  onValue, 
  off, 
  serverTimestamp,
  query,
  orderByChild,
  limitToLast
} from "firebase/database";
import { realTimedb } from "./firebaseConfig";

export interface RealtimeMessage {
  id?: string;
  from: string;
  fromId: string;
  message: string;
  timestamp: number;
  channelId: string;
  serverId: string;
}

/**
 * Send a message to a specific channel
 */
export const sendMessage = async (
  serverId: string, 
  channelId: string, 
  message: RealtimeMessage
) => {
  try {
    const messagesRef = ref(realTimedb, `messages/${serverId}/${channelId}`);
    const messageWithTimestamp = {
      ...message,
      timestamp: serverTimestamp()
    };
    
    await push(messagesRef, messageWithTimestamp);
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

/**
 * Listen to messages in a specific channel
 */
export const listenToMessages = (
  serverId: string,
  channelId: string,
  callback: (messages: RealtimeMessage[]) => void,
  limit: number = 50
) => {
  const messagesRef = ref(realTimedb, `messages/${serverId}/${channelId}`);
  const messagesQuery = query(
    messagesRef,
    orderByChild('timestamp'),
    limitToLast(limit)
  );

  const unsubscribe = onValue(messagesQuery, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const messages: RealtimeMessage[] = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      
      // Sort by timestamp (newest last)
      messages.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      callback(messages);
    } else {
      callback([]);
    }
  });

  // Return unsubscribe function
  return () => off(messagesQuery);
};

/**
 * Listen to user typing status
 */
export const setTypingStatus = async (
  serverId: string,
  channelId: string,
  userId: string,
  userName: string,
  isTyping: boolean
) => {
  try {
    const typingRef = ref(realTimedb, `typing/${serverId}/${channelId}/${userId}`);
    
    if (isTyping) {
      await push(typingRef, {
        userName,
        timestamp: serverTimestamp()
      });
    } else {
      // Remove typing status
      await push(typingRef, null);
    }
  } catch (error) {
    console.error("Error setting typing status:", error);
  }
};

/**
 * Listen to typing indicators
 */
export const listenToTyping = (
  serverId: string,
  channelId: string,
  currentUserId: string,
  callback: (typingUsers: string[]) => void
) => {
  const typingRef = ref(realTimedb, `typing/${serverId}/${channelId}`);

  const unsubscribe = onValue(typingRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const typingUsers: string[] = [];
      
      Object.keys(data).forEach(userId => {
        if (userId !== currentUserId && data[userId]) {
          const userData = Object.values(data[userId])[0] as any;
          if (userData?.userName) {
            typingUsers.push(userData.userName);
          }
        }
      });
      
      callback(typingUsers);
    } else {
      callback([]);
    }
  });

  return () => off(typingRef);
};
