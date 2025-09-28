import { motion } from "motion/react";
import Link from "next/link";

export default function authGuard() {
  return (
    <motion.div
      className="text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <p className="font-semibold text-xl text-red-500">
        You are trying to access a PRIVATE PAGE!
      </p>
      <Link href={"/"}>Login</Link>
    </motion.div>
  );
}
