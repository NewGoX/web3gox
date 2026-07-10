#!/usr/bin/env python3
"""
把币安教程配图从 Cowork 会话缓存解码，保存到 web3gox/images/binance/
直接在 Terminal 运行：
  python3 ~/Documents/GitHub/web3gox/get-binance-images.py
"""
import json, base64, os, sys

# Cowork 本次会话缓存目录（图片已下载至此）
CACHE_DIR = (
    "/var/folders/sy/848wrmt9359gk_dkx8k9xm980000gn/T/"
    "claude-hostloop-plugins/57a59c430fa6aa41/projects/"
    "-Users-hdf-Library-Application-Support-Claude-local-agent-mode-sessions-"
    "def1b5f3-e0c3-4603-bbaf-33d351851a41-"
    "e49daf71-d688-4097-9cb4-d9b14a90ef7e-"
    "local-d73a3f43-8462-4e7a-a781-204db7a5c252-outputs/"
    "9791c3ed-526d-4f42-bfe6-a5b2c3bde379/tool-results"
)

FILES = {
    "mcp-be54a6e5-16aa-420c-a3e9-0d5ce924cd4e-download_file_content-1783664019377.txt":
        "Pasted image 20260709221204.png",
    "mcp-be54a6e5-16aa-420c-a3e9-0d5ce924cd4e-download_file_content-1783664019473.txt":
        "Pasted image 20260709221320.png",
    "mcp-be54a6e5-16aa-420c-a3e9-0d5ce924cd4e-download_file_content-1783664019673.txt":
        "Pasted image 20260709221336.png",
    "mcp-be54a6e5-16aa-420c-a3e9-0d5ce924cd4e-download_file_content-1783664020194.txt":
        "Pasted image 20260709221352.png",
    "mcp-be54a6e5-16aa-420c-a3e9-0d5ce924cd4e-download_file_content-1783664020299.txt":
        "Pasted image 20260709221403.png",
    "mcp-be54a6e5-16aa-420c-a3e9-0d5ce924cd4e-download_file_content-1783664021228.txt":
        "Pasted image 20260709221708.png",
}

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images", "binance")
os.makedirs(OUT_DIR, exist_ok=True)

ok = 0
for fname, imgname in FILES.items():
    src = os.path.join(CACHE_DIR, fname)
    if not os.path.exists(src):
        print(f"  ❌ 缓存文件不存在：{fname}")
        print("     → 请在 Cowork 中重新运行本任务后再执行此脚本")
        continue
    try:
        with open(src) as f:
            b64 = json.load(f)["content"]
        out = os.path.join(OUT_DIR, imgname)
        with open(out, "wb") as f:
            f.write(base64.b64decode(b64))
        print(f"  ✅ {imgname}")
        ok += 1
    except Exception as e:
        print(f"  ❌ {imgname}：{e}")

print(f"\n完成：{ok}/{len(FILES)} 张图片已保存到 images/binance/")
