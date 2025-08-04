// functions/asn.js
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  // 可以通过 ?id=140915 动态指定其他 ASN
  const asn = url.searchParams.get('id') || '140915';

  // 调用 BGPView 查询
  const apiRes = await fetch(`https://api.bgpview.io/asn/${asn}`);
  if (!apiRes.ok) {
    return new Response(`Error fetching ASN ${asn}`, { status: 502 });
  }
  const data = await apiRes.json();

  // 返回 JSON 给前端
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}