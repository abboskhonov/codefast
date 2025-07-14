import type { TypingResult } from "@/lib/calculateResults";

interface ResultsProps extends TypingResult {
  onRestart: () => void;
}

export default function Results({ wpm, accuracy, raw, onRestart }: ResultsProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white space-y-12">
      <div className="grid grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-5xl font-bold text-green-400">{wpm}</div>
          <div className="text-zinc-500 text-sm uppercase mt-1 tracking-wide">WPM</div>
        </div>
        <div>
          <div className="text-5xl font-bold text-blue-400">{accuracy.toFixed(1)}%</div>
          <div className="text-zinc-500 text-sm uppercase mt-1 tracking-wide">Accuracy</div>
        </div>
        <div>
          <div className="text-5xl font-bold text-yellow-400">{raw}</div>
          <div className="text-zinc-500 text-sm uppercase mt-1 tracking-wide">Raw</div>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="px-6 py-3 border border-zinc-700 text-white rounded-lg hover:bg-zinc-800 transition"
      >
        Restart
      </button>
    </div>
  );
}
