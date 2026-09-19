export async function copyText(text: string, status: HTMLElement) {
 try { await navigator.clipboard.writeText(text); status.textContent='Copied to clipboard.'; }
 catch { status.textContent='Clipboard access is unavailable. Select the result and copy it manually.'; }
}
export function downloadText(text: string, name: string) {
 const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
 const link=document.createElement('a'); link.href=url; link.download=name; link.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
}
