export function getFirstName() {
  const charset = '李王张刘陈杨赵黄周吴徐孙胡朱高林何郭马罗梁宋郑谢韩唐冯于董萧程曹袁邓许傅沈曾彭吕苏卢蒋蔡贾丁魏薛叶阎余潘杜戴夏钟汪田任姜范方石姚谭廖邹熊金陆郝孔白崔康毛邱秦江史顾侯邵孟龙万段漕钱汤尹黎易常武乔贺赖龚文'.split('');

  const denominator = ((1 + charset.length) * charset.length) / 2;

  const firstNames = charset.map((char, idx) => (
    { char, percent: (1 / denominator) * (charset.length - idx) }
  ));

  // 随机百分比
  const step = Math.random();
  let cStep = 0;
  for (const firstName of firstNames) {
    cStep += firstName.percent;
    // 如果命中百分比
    if (cStep >= step) return firstName.char;
  }
  return firstNames[Math.floor(Math.random() * (charset.length - 1))].char;
}
