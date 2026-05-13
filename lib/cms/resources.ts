export function inferResourceKind(url: string): 'ppt' | 'pdf' | 'image' | 'link' {
  const clean = url.toLowerCase().split('?')[0];
  if (clean.endsWith('.ppt') || clean.endsWith('.pptx')) return 'ppt';
  if (clean.endsWith('.pdf')) return 'pdf';
  if (clean.match(/\.(png|jpg|jpeg|webp|gif)$/)) return 'image';
  return 'link';
}

export function parseResourceLines(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') return [];

  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [first, ...rest] = line.split('|').map((part) => part.trim());
      const url = rest.length ? rest.join('|') : first;
      const label = rest.length ? first : url.replace(/^https?:\/\//, '').slice(0, 48);

      return {
        label,
        url,
        kind: inferResourceKind(url),
      };
    });
}
