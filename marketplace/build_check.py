from pathlib import Path
root = Path(r'c:\laragon\www\project02\marketplace\public\app\browser')
for name in ["main-OPMLEENF.js","chunk-O24MK2FV.js"]:
    path = root/name
    print("FILE", path)
    if not path.exists():
        print("MISSING")
        continue
    text = path.read_text(encoding="utf-8", errors="ignore")
    for pattern in ["project02", "apiUrl", "environment"]:
        idx = text.find(pattern)
        print(pattern, "found" if idx != -1 else "not found", idx)
        if idx != -1:
            start = max(0, idx - 80)
            end = min(len(text), idx + 80)
            snippet = text[start:end].replace("\n", "\\n")
            print("SNIPPET", snippet)
    print("---")
