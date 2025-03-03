import * as motion from "motion/react-client";

export default function SplitText({ text }: { text: string }) {
  const testText: string[] = text.split('');

  return (
    <div className="flex font-bold text-2xl">
      {testText.map((e, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: 0.02 * index,
            scale: { type: "spring", stiffness: 200, damping: 25 },
          }}
          className={e === " " ? "w-2" : ""}
        >
          {e}
        </motion.div>
      ))}
    </div>
  );
}
