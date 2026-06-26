const fs = require("fs");
const https = require("https");

const url = "https://top.baidu.com/api/board?platform=wise&tab=realtime";

https.get(url, (res) => {
    let data = "";

    res.on("data", chunk => {
        data += chunk;
    });

    res.on("end", () => {
        try {
            const json = JSON.parse(data);
            const list = json.data.cards[0].content;

            const result = list.map((item, index) => ({
                rank: index + 1,
                title: item.word,
                url: "https://www.baidu.com/s?wd=" + encodeURIComponent(item.word)
            }));

            fs.writeFileSync("hot.json", JSON.stringify(result, null, 2));
            console.log("✅ 更新成功");
        } catch (e) {
            console.error("❌ 解析失败", e);
        }
    });
});
