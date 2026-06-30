import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Card from "../ui/Card";
import { IoCopyOutline, IoCheckmark } from "react-icons/io5";
import { useState } from "react";

function UserMessage({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex justify-end"
    >
      <div className="max-w-[75%] bg-indigo-600/30 border border-indigo-500/30 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed shadow-md">
        {text}
      </div>
    </motion.div>
  );
}

function AssistantMessage({ content }) {
    const [copied, setCopied] = useState(false);

    const copyAnswer = async () => {
    await navigator.clipboard.writeText(content.answer);

    setCopied(true);

    setTimeout(() => {
    setCopied(false);
  }, 2000);
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start"
    >
      <div className="flex items-start gap-3 max-w-[90%]">
        <div className="shrink-0 w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
          ⚖️
        </div>

        <Card className="relative px-5 py-4 w-full">
            <button
  onClick={copyAnswer}
  className="absolute top-3 right-3 flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
>
  {copied ? (
    <>
      <IoCheckmark />
      Copied
    </>
  ) : (
    <>
      <IoCopyOutline />
      Copy
    </>
  )}
</button>

          <ReactMarkdown>
            {content.answer}
          </ReactMarkdown>

          <div className="mt-5 border-t border-slate-700 pt-4 grid grid-cols-2 gap-3 text-sm">

            <div className="bg-slate-800 rounded-lg p-3">
              📄 <span className="font-semibold">
                {content.documents_retrieved}
              </span>
              <div className="text-xs text-slate-400">
                Relevant Chunks
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-3">
              ⚡ <span className="font-semibold">
                {content.retrieval_time}s
              </span>
              <div className="text-xs text-slate-400">
                Retrieval
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-3">
              🧠 <span className="font-semibold">
                {content.generation_time}s
              </span>
              <div className="text-xs text-slate-400">
                Generation
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-3">
              ⏱ <span className="font-semibold">
                {content.total_time}s
              </span>
              <div className="text-xs text-slate-400">
                Total
              </div>
            </div>

          </div>

        </Card>
      </div>
    </motion.div>
  );
}

function ErrorMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start"
    >
      <div className="flex items-start gap-3 max-w-[85%]">
        <div className="shrink-0 w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-base mt-0.5">
          ⚠️
        </div>
        <Card className="px-4 py-3 border-red-800/50">
          <p className="text-sm text-red-400 font-medium">
            Unable to contact the LexRAG server.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Make sure the backend is running at{" "}
            <code className="text-slate-400">http://127.0.0.1:8000</code>
          </p>
        </Card>
      </div>
    </motion.div>
  );
}

export default function Message({ role, content }) {
  if (role === "user") {
    return <UserMessage text={content} />;
  }

  if (role === "error") {
    return <ErrorMessage />;
  }

  return <AssistantMessage content={content} />;
}