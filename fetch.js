const fs = require("fs");
const https = require("https");

const url = "https://top.baidu.com/board?tab=realtime";

https.get(url, (res) => {
    let data = "";

    res.on("data", chunk => {
        data += chunk;
    });

    res.on("end", () => {

        // ✅ 简单正则抓取关键词
        const matches = [...data.matchAll(/"word":"(.*?)"/g)];

        const result = matches.slice(0, 20).map((match, index) => ({
            rank: index + 1,
            title: match[1],
            url: "https://www.baidu.com/s?wd=" + encodeURIComponent(match[1]),
            hot: "",
            trend: ""
        }));

        fs.writeFileSync("hot.json", JSON.stringify(result, null, 2));
        console.log("✅ 更新成功");
    });

}).on("error", (e) => {
    console.error("❌ 请求失败:", e.message);
});
