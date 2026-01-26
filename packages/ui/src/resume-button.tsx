import { Button } from "./button";

type ResumeButtonProps = {
  label: string;
};

export function ResumeButton({ label }: ResumeButtonProps) {
  return <Button>{label}</Button>;
}
