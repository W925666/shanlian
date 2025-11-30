/* * 闪电UID提取脚本 (HTTP Response)
 * 提取 https://api.shanlianvpn.info/app/customer/slgetNodesgs 响应中的 data.uid
 */

const responseBody = $response.body;

if ($response.status === 200 && responseBody) {
    try {
        // 尝试解析响应体为 JSON
        const body = JSON.parse(responseBody);

        // 检查并提取 UID
        const uid = body?.data?.uid;

        if (uid) {
            // 通过通知和日志记录 UID
            $notify("【闪电UID提取成功】", "UID 已获取", `UID: ${uid}`);
            console.log(`[Shanlian-UID] 成功提取到 UID: ${uid}`);

            // 如果需要，可以将 UID 写入 Loon 的持久化存储
            // $persistentStore.write(uid, 'Shanlian_UID');
        } else {
            console.log("[Shanlian-UID] 响应 JSON 中未找到 data.uid 字段或数据结构不符。");
        }

    } catch (e) {
        // JSON 解析失败处理
        $notify("【闪电UID提取失败】", "JSON 解析错误", `详情请查看 Loon 日志。`);
        console.error(`[Shanlian-UID] JSON 解析错误: ${e.message}`);
    }
} else {
    console.log(`[Shanlian-UID] 请求失败或状态码非 200，状态码: ${$response.status}`);
}

// 脚本执行完成
$done({});
