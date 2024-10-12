export function getNextMemorandumNumber(lastMemoNumber: string | null): string {
  if (lastMemoNumber) {
    return (parseInt(lastMemoNumber) + 1).toString().padStart(2, '0');
  } else {
    return '001';
  }
}
