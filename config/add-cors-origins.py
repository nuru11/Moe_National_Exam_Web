from pathlib import Path

p = Path("/home/ubuntu/app/.env")
text = p.read_text()
origins = [
    "https://moenationalexam.com",
    "https://www.moenationalexam.com",
]
lines = text.splitlines()
for key in ("DJANGO_CORS_ALLOWED_ORIGINS", "DJANGO_CSRF_TRUSTED_ORIGINS"):
    found = False
    for i, line in enumerate(lines):
        if line.startswith(key + "="):
            parts = [x.strip() for x in line.split("=", 1)[1].split(",") if x.strip()]
            for origin in origins:
                if origin not in parts:
                    parts.append(origin)
            lines[i] = key + "=" + ",".join(parts)
            found = True
            break
    if not found:
        lines.append(key + "=" + ",".join(origins))
p.write_text("\n".join(lines) + "\n")
for line in lines:
    if line.startswith("DJANGO_CORS_ALLOWED_ORIGINS=") or line.startswith(
        "DJANGO_CSRF_TRUSTED_ORIGINS="
    ):
        print(line)
