import { Input } from "@/components/atoms/Input";

export function VerifyInput({
  value,
  onChange
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/80">Enter SHA-256 hash or IPFS CID</label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., a3f1... or bafy..."
      />
    </div>
  );
}


