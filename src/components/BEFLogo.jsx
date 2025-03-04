import T from "prop-types";

function BEFLogo({ width = "170" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      viewBox="0 0 180 76"
      fill="none"
      aria-hidden="true"
      data-icon="logo"
    >
      <path
        fill="#002041"
        d="M30.1978 74.4761H0V.36804h28.1696s-9.101 13.83006-9.101 37.23806c0 22.2172 11.1075 36.8526 11.1075 36.8526"
      />
      <path fill="url(#a)" d="M37.99.36804H11.2375V74.4804H37.99V.36804Z" />
      <mask
        id="b"
        width="61"
        height="75"
        x="24"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{maskType : "alpha"}}
      >
        <path
          fill="#00A4E1"
          fillRule="evenodd"
          d="M84.5088.36804H34.4969C27.3669 11.5123 23.7644 24.5449 24.1595 37.7656c.395 13.2207 4.7693 26.0154 12.552 36.7148h47.7973V.36804Z"
          clipRule="evenodd"
        />
      </mask>
      <g mask="url(#b)">
        <path
          fill="url(#c)"
          d="M84.6128.36774H27.3635V74.4801h57.2493V.36774Z"
        />
      </g>
      <path
        fill="#47B3E6"
        d="M82.9789 63.4c.0604-.1835.1053-.3718.1343-.5629a27.36346 27.36346 0 0 1-9.3826-4.2694 3.96012 3.96012 0 0 0-.4854.7448.72352.72352 0 0 1-.2384.0563 28.51943 28.51943 0 0 0 9.257 4.3733c.2447-.1003.4834-.2145.7151-.3421ZM72.6554 58.6803c.2471-.1732.4941-.368.5938-.433-.0564-.0433-.2124-.1948-.2644-.2381-.182-.0217-.4854 0-1.3001-.1213-.0434-.1039-.0997-.2468-.1387-.355a.58953.58953 0 0 0-.5244.2814c.6067.5196 1.2308.9959 1.8722 1.4592-.0563-.1429-.1083-.2468-.2297-.5802M63.104 25.2828c0-.0303-.065-.0779-.078-.0996-.1041.2512-.2037.5066-.2991.7621.2341-.1472.4681-.2771.4724-.2814a1.90215 1.90215 0 0 1-.0953-.3811ZM65.2665 20.7796a28.8122 28.8122 0 0 0-1.4518 2.6283l.4334.1126c.1603-.1386.2557-.2079.3033-.2425.078.2121.1647.4113.2384.6148.3843-.7909.809-1.566 1.2741-2.3252-.1473-.3637-.2427-.5456-.3857-.8357l-.4074.0477M57.882 32.224l.0217-.0563.741-.2945v-.0822a4.26353 4.26353 0 0 1-.9361-1.1042c-.0953.5759-.169 1.1561-.234 1.732.143-.0519.3424 0 .3944-.2035"
      />
      <path
        fill="#47B3E6"
        d="M70.6144 59.2043c-.2904-.3377-.3337-.5802-.6587-.866-.2753.071-.5437.1666-.8018.2858 4.3406 3.9002 9.7022 6.4863 15.4586 7.4563v-1.0999c-5.0745-.8881-9.831-3.0785-13.8031-6.3564a1.35264 1.35264 0 0 1-.195.5802ZM83.8196 63.0103c.0988.3455.167.699.2037 1.0565a4.51661 4.51661 0 0 0-.4334-.3637c-.1604.1255-.1734.1299-.3641.2944.4117.0953.9491.1732 1.3695.2468v-1.1041c-.2253-.0433-.5677-.0823-.7931-.1299M59.3293 28.0022c.0564-.1386.1214-.2771.1517-.3334.234-.866.5114-1.732.8191-2.5591a1.0263 1.0263 0 0 0-.2904-.5326c-.104.078-.4333.3638-.546.4677a2.97173 2.97173 0 0 0-.2124-.2165 32.2174 32.2174 0 0 0-1.5168 5.7719c.1213-.2035.1387-.2252.2384-.433.065-.0476.2513-.1299.481-.2425-.0433-.1905-.0953-.368-.1387-.5975.065-.104.5157-.5326.7194-.7621a2.98192 2.98192 0 0 1-.273-1.1215c.162.2069.3533.3892.5677.5413M56.5037 38.1949c-.1387-.1818-.2773-.3723-.5157-.6451a2.7394 2.7394 0 0 1-.1083-.4763 5.40087 5.40087 0 0 0-.3121-.5586c.0094 1.5755.1427 3.1478.3987 4.7024a.5414.5414 0 0 1 .2991-.1472c.0163-.2279.0926-.4475.221-.6366a5.63104 5.63104 0 0 0-.26-.6235c.0433-.0779.338-.2035.3987-.2511-.0304-.2685-.0564-.5326-.078-.8011a.92563.92563 0 0 1-.2601-.2728c.0632-.1031.1358-.2002.2167-.2901ZM60.5905 27.4132c-.109.0581-.2134.1247-.312.1992-.065.2382-.1343.4763-.195.7145a.52866.52866 0 0 0 .2254.2035.73482.73482 0 0 0 .0736.3377l.2861-.1256c.1126-.3031.1646-.6538.4333-.801a.896.896 0 0 1 .1139-.4449.89708.89708 0 0 1 .3195-.3302c.2889-.9295.6255-1.8474 1.0098-2.7539 0 0-.3857-.2468-.6111-.368-.157.0305-.3119.071-.4637.1212-.0303.078-.065.1559-.0953.2295l.3943.1646c.117.1255.1561.1818.4334.5239 0 0-.403.6841-.5937 1.0089-.0217 0-.2037-.0606-.3597-.1516a3.13957 3.13957 0 0 0-.3814-.1905c-.0823.2252-.1473.433-.221.6798-.0433.3248-.0303.7881-.052.9829M63.1865 22.4512a9.6873 9.6873 0 0 1-.7151 1.1561.86767.86767 0 0 0 .3337.2208c.4636-1.0293.986-2.0312 1.5645-3.0007-.2903-.4676-.3423-.5369-.3813-.6192.0895-.2973.1547-.6014.195-.9093a.20825.20825 0 0 0-.0607-.1126c-.3207.4807-.6197.9743-.9058 1.4679 0 .026.0001 1.377-.0303 1.797ZM60.3477 23.5813s-.1647-.433-.4334-.4763c-.156.368-.312.7361-.4333 1.1085h.2556c.2238-.1887.4298-.3974.6154-.6236M60.2698 22.5982l.2903-.0953c.229.1072.4634.2026.7021.2858a.4328.4328 0 0 1 .104-.1256c0-.1948 0-.3204-.026-.4676s-.1733-.6235-.2427-.7794c.3207-.0996.5504-.1602.9621-.3031.2384-.433.1907-.9959.7064-1.2644a.43356.43356 0 0 0 .1431-.1385c.3033-.5023.624-1.0003.9577-1.4852l-.1647-.1083c.029-.1912.0148-.3864-.0415-.5714a1.2987 1.2987 0 0 0-.2835-.4981 31.84843 31.84843 0 0 0-3.194 5.4948c0 .0216.039.0216.0867.0563ZM83.2475 61.4859a2.37734 2.37734 0 0 0-.7714-.8314 26.28585 26.28585 0 0 1-2.6999-.9526c-.1517.1039-.2947.2122-.3987.2988-.039.2425-.0347.3421-.0824.5283a1.64581 1.64581 0 0 1-.6674-.0996c-.1517-.3508-.104-.8011-.2773-1.0955a4.80763 4.80763 0 0 1-.8668 0l-.3164.3161a4.53536 4.53536 0 0 1-1.1051-.918c-.2236.0574-.451.0994-.6804.1256a26.88211 26.88211 0 0 0 7.8875 3.3168c.0412-.2379.0412-.481 0-.7188M66.5017 22.529a2.61454 2.61454 0 0 0-.0866-.3161c-.169.2814-.3294.5672-.4854.866.5287-.4763.585-.3767.572-.5369M53.9338 52.7049c.2557.5499.5288 1.0912.8105 1.6281a8.0952 8.0952 0 0 0-.0694-1.1561 2.37736 2.37736 0 0 0-.7411-.472ZM56.7162 60.4122c.2687.2208.4334.3291.9014.6928h.1214c-.2817-.3594-.5634-.7231-.8321-1.0955l-.1907.4114M58.6748 23.9624c-.4251.4791-.8147.9885-1.1658 1.5242a6.46415 6.46415 0 0 0 0 .775c-.1474.1343-.4334.3031-.6458.433-.0693.2468-.1473.4936-.208.7448a33.74449 33.74449 0 0 0-1.0488 7.1142c.189.2573.3488.5346.4768.827.0866.3507-.0737.7145.0693 1.0609.0942.1971.1983.3893.312.5759 0-.524-.0216-1.0522 0-1.5805a.55456.55456 0 0 0-.0346-.1645 1.21407 1.21407 0 0 1-.039-.3984c.02-.0829.0506-.163.091-.2382a32.7696 32.7696 0 0 1 2.2232-10.6907M58.8005 59.8622s0-.2814-.026-.407c-.4998-.6582-.9766-1.3293-1.4302-2.0135a.96729.96729 0 0 0-.156 0c-.2037.0433-.3813.078-.5417.104a39.71525 39.71525 0 0 0 4.5895 5.7719c0-.0217.2557-.078.2687-.0996.104.1732.1343.1818.312.5066.1214 0 .4334-.052.6501-.0866a31.6222 31.6222 0 0 1-1.0661-1.0912 16.35755 16.35755 0 0 1-2.6003-2.7019M58.1418 9.27484c-.0997.12124-.208.23815-.3077.35939.1061.0161.2134.02334.3207.02165a2.28686 2.28686 0 0 0 0-.38104M69.5659 2.01332l-.2384.14289c.1127 0 .3077.19052.4334.21217.0433 0 .4334-.3031.351-.48496-.104.09526-.1387.13856-.2643.25547a.68041.68041 0 0 1-.2817-.12557ZM56.7421 59.7759a40.97729 40.97729 0 0 1-3.8094-6.4387c-.2221.016-.436.0907-.6197.2165.546 1.1546 1.1484 2.2905 1.8072 3.4077.6804 1.1518 1.4128 2.2559 2.1885 3.3254l.1777.0303c-.0347-.1905-.052-.2468-.0737-.3594.1061-.0671.2161-.1279.3294-.1818ZM50.0333 46.5565c.1262-.0231.2535-.039.3814-.0476a40.40853 40.40853 0 0 1-.8234-17.4067c-.195.1299-.273.1819-.4334.2685a2.12433 2.12433 0 0 1-.286-.026 40.91261 40.91261 0 0 0 .8061 17.0299c.119.048.2324.1089.338.1819M54.2804 15.9473a40.3928 40.3928 0 0 1 2.6003-4.0009c-.0303-.1515-.065-.3074-.0867-.459-.052-.381.3294-.6235.3597-.9742a41.04105 41.04105 0 0 0-3.3587 5.0055c.1852.1225.3542.268.5028.433M51.5114 21.9187v-.9786c0-.1732-.0606-.3464-.0996-.5196a41.96806 41.96806 0 0 0-1.7336 5.2436c-.1256.485-.2383.9743-.3467 1.4592.158.1973.2638.431.3077.6798 0 .1559.039.2728.1604.2771.1473-.7534.3164-1.5025.5114-2.2559.3423-1.3293.7497-2.6326 1.2134-3.897"
      />
      <path
        fill="#47B3E6"
        d="M56.4475 49.3318c.2439-.1338.4498-.3276.598-.5629-.3943-.9916-.741-2.0048-1.0401-3.031-.507-.5932-.6067-1.3769-.7021-2.8102-.039-.1905-.117-.6192-.1863-1.0175a34.75277 34.75277 0 0 1-.078-11.336 3.89064 3.89064 0 0 1-.4074.6798 3.14103 3.14103 0 0 1-.5807.1473 35.4761 35.4761 0 0 0 1.3651 15.3282c.169.1255.4334.2814.7974.5152 0 0-.2643 1.3423.2557 2.0871M57.0847 53.2333c-.1907-.3551-.3684-.7145-.5461-1.0739 0 0-.0433.2165-.0477.2555l-.273.039c.0218.1484.0611.2937.117.433.1127.0649.4724.2338.7498.3507M60.673 53.6228c.2541-.0007.5067-.0386.7498-.1126l.0346-.0259c-.4333-.7275-.8667-1.4679-1.2741-2.2257-.0997-.0433-.299-.1342-.4334-.2121-.1343-.078-.533-.091-.6934-.1256.3525.7188.7266 1.4217 1.1225 2.1087.1413-.0366.2882-.0469.4333-.0303.0304.1429.026.2771.0564.6235M64.14 59.9791c-.0217.0303-.039.0563-.065.0866.1512.3882.2517.7942.299 1.2081a.602.602 0 0 0-.104.1082c4.539 4.562 10.2299 7.8105 16.4683 9.4005 1.2772.3198 2.5705.5713 3.8744.7534v-.866c-1.1787-.1775-2.4789-.433-3.6577-.7144-6.4432-1.6537-12.278-5.1155-16.815-9.9764Z"
      />
      <path
        fill="#47B3E6"
        d="M67.5115 60.724c-.3525.098-.7295.0528-1.0488-.1256l-.2687-1.1172c-.3034-.3031-.6024-.6148-.8928-.9352a1.85324 1.85324 0 0 1-.585.6451c4.4305 4.7862 10.1484 8.1944 16.4684 9.8162 1.1007.2857 2.3185.5066 3.4193.6798v-.866c-1.0271-.1603-2.1669-.3724-3.2026-.6366-5.166-1.3268-9.9343-3.8819-13.8985-7.4476M67.2904 8.05818l.2037.03897c.1994-.19918.1733-.40702.3207-.62352-.2037.15155-.403.29877-.6024.45898a.19068.19068 0 0 0 .0263.07065.1908.1908 0 0 0 .0517.05492ZM62.7357 61.1613a4.09444 4.09444 0 0 0-.4811.1905c0 .1905 0 .394-.026.5369.2514.2641.5071.5283.7628.7837.613.3481 1.1933.751 1.7335 1.2038 0 .0303-.0823.3074-.091.329 4.4775 3.9832 9.843 6.8395 15.6493 8.331 1.4284.3555 2.8751.633 4.3338.8313v-.866a38.66613 38.66613 0 0 1-4.1128-.7924c-6.8112-1.7418-12.9785-5.4013-17.7685-10.5435M68.5299 7.08401c.3901-.21217.3901-.21217.4897.22516.0217.09526.0477.19052.0737.28578l.377-.27712V6.28729c-.3683.25114-.7367.50661-1.0964.77074a.13006.13006 0 0 0 .1603.03464M69.6394 4.12203a.74581.74581 0 0 0-.2426.02598c-1.0835.6928-2.1337 1.439-3.1507 2.23861.0146.07437.0248.14957.0303.22516.3251.06928.3251.06928.0477.68414a.67434.67434 0 0 0-.0563.18619 36.78574 36.78574 0 0 1 3.1723-2.32954l-.1647-.08227a2.2282 2.2282 0 0 1-.4334.09093.60644.60644 0 0 1 .0347-.35506c.078 0 .2557-.02598.403-.05196a5.83475 5.83475 0 0 0 .3467-.63218M53.8817 1.00888a.36933.36933 0 0 1 .026.07361l.1647-.1602a3.72943 3.72943 0 0 0 .3207-.55425h-.2211c-.234.23382-.4723.46331-.702.70146a2.77932 2.77932 0 0 1 .4333-.06062M45.2098 21.7497c.0266.0869.0645.1698.1127.2468.0607-.0909.1214-.1299.234-.2987.0102-.2194.0437-.4372.0997-.6495a.5719.5719 0 0 1 .1734.2165 46.44948 46.44948 0 0 1 1.7595-4.4816 1.13962 1.13962 0 0 1 .0607-.433l-.1691-.0866a.93678.93678 0 0 1-.2166.1602 46.9886 46.9886 0 0 0-2.0543 5.3043M56.8158.36804c-.4117.38104-.8234.77074-1.2221 1.16477a5.66063 5.66063 0 0 1-.3728.85734c.6718-.6928 1.3739-1.35529 2.0889-2.00479l-.494-.01732ZM43.6065 8.4521v-.22083c0-.11258 0-.14289-.039-.21217a53.79727 53.79727 0 0 0-6.0933 14.5055c-.3381 1.3106-.627 2.6269-.8668 3.949a.49891.49891 0 0 0 .2384-.078c.2484-1.2816.5345-2.5518.8581-3.8104a53.43524 53.43524 0 0 1 5.9026-14.1331ZM44.3605 10.786a51.70688 51.70688 0 0 1 3.3413-5.22629.76777.76777 0 0 0-.2297-.05629 51.1851 51.1851 0 0 0-3.064 4.76298c0 .1472-.026.3248-.0476.524M66.9915 72.2116c.0129.1152.0331.2295.0606.3421a38.33715 38.33715 0 0 0 3.4671 1.9269h.9621a42.80651 42.80651 0 0 1-4.3338-2.3815l-.156.1125ZM59.9621 2.97483a.82183.82183 0 0 0-.1127-.48496c-.494.433-.9838.90064-1.4605 1.37261l.2384.36805c.4334-.433.8667-.866 1.3348-1.2557ZM43.6064 3.76257a55.69425 55.69425 0 0 0-7.1031 13.95123c-.0607.2728-.1257.5413-.182.8141a55.78145 55.78145 0 0 1 7.3371-14.70038.43517.43517 0 0 0-.052-.06928M54.2111 30.1326c.3221-.2256.6317-.4684.9274-.7275a7.6708 7.6708 0 0 0-.0824-.9439c.2167-.2468.3728-.4677.5028-.6106.052-.2121.0953-.433.1473-.6321a34.81615 34.81615 0 0 1 5.3176-11.4745l-.5158-.7621c-2.6124 3.6202-4.5233 7.6971-5.6339 12.0201-.2629 1.0392-.481 2.0827-.6544 3.1306"
      />
      <path
        fill="#47B3E6"
        d="M52.7939 27.8375c-.1733.8097-.2297 1.1085-.2643 1.299.1439.1844.2513.3946.3163.6192 0 .0433-.338.3681-.4333.4633.0346.3594.026.3897.0346.6365a1.29996 1.29996 0 0 1-.247.3248c-.0347.2425-.0607.4806-.0867.7231.0268.2348.12.4571.2687.6408.0806-.1153.1705-.2239.2687-.3247.104-.0346.1994.0303.2947.0303.6942-6.7655 3.2435-13.2083 7.3674-18.619l-.1213-1.1691-.026-.0563c-3.3397 4.1617-5.7524 8.9873-7.0771 14.1548-.1083.433-.208.866-.3033 1.299M53.1278 45.4259c.1786-.1761.3667-.3423.5634-.4979a.96527.96527 0 0 1 .221.1126 36.58506 36.58506 0 0 1-1.0487-11.6911c-.0434.0347-.2341.0563-.2731.091-.0901.267-.1987.5274-.325.7794a1.98122 1.98122 0 0 1-.3164-.1429 37.44529 37.44529 0 0 0 1.1702 11.3489M57.9078 52.2587c.2593.0513.5212.0889.7844.1126-.1647-.3161-.3207-.6409-.481-.9613a2.54762 2.54762 0 0 1-.26.0736c-.1127-.0389-.1647-.0476-.2991-.0822-.1343.0649-.3163.1645-.3293.1645.0823.1689.1646.3377.2513.5066a.776.776 0 0 1 .3337.1862ZM58.3456 22.9101c.0347.026.0347.0693.117.2598.0985-.0738.1873-.1596.2644-.2554a.97326.97326 0 0 1 .2336-.5747.97567.97567 0 0 1 .5334-.3173 32.82053 32.82053 0 0 1 2.1669-3.949 4.71378 4.71378 0 0 1-.3553-.6711c.4073-.524.8364-1.0695.9707-1.2298.2037-.0779.3164-.1125.4334-.1602 0 0-.0433-.1948-.0607-.4027a3.5336 3.5336 0 0 1-.3813.0607 33.98942 33.98942 0 0 0-4.0955 7.2484h.1951M67.4941 58.4723c-.5201-.55-.3598-.3811-.5504-.5716-.1387.3551.065.7534 0 1.1171 4.8248 4.7296 11.0027 7.8424 17.6775 8.9069v-1.0955c-6.333-1.0461-12.1951-3.9995-16.8021-8.4652-.039 0-.286.0909-.3164.1083M62.2373 52.6443c.2904.0259.4681.0692.7368.0866.0396-.0757.0743-.1538.104-.2339l-.1301-.2165a5.20352 5.20352 0 0 1-.6847-.3637 10.47059 10.47059 0 0 1-.5287-1.1171 2.454 2.454 0 0 0-.4724.7318c.2947.5369.6024 1.0651.9274 1.5891 0-.1602.026-.3464.0477-.4763ZM65.7955 66.5782c-.039.2685-.0694.433-.117.7318 4.2099 3.2323 9.0324 5.5774 14.1758 6.8934.377.0996.7584.1905 1.1354.2771h3.6231a42.17726 42.17726 0 0 1-4.5938-.905c-5.1745-1.3246-10.0177-3.7072-14.2235-6.9973ZM51.2382 30.4053a2.11764 2.11764 0 0 0-.3163-.2857c-.1842.2825-.33.5883-.4334.9093-.039.3161-.0737.6365-.1084.9526.078.4893.0824.6105.1777 1.4765a2.41345 2.41345 0 0 1-.3293.5413c-.1771 3.636.1511 7.279.9751 10.825.2045-.0921.4041-.1947.598-.3075a38.46416 38.46416 0 0 1-.5634-14.1288M65.2883 68.5006c.104.1775.3554.5975.4334.7578-.078.1125-.078.1385-.1647.2554a41.30597 41.30597 0 0 0 9.1963 4.9665h1.9546a40.52802 40.52802 0 0 1-11.3979-5.984M69.0849 2.58069c.078-.12124.1126-.19918.1386-.23815.026-.03897.026-.1299.0304-.14289a39.52135 39.52135 0 0 0-3.6967 2.52872 2.9418 2.9418 0 0 1-.1214.433 1.58718 1.58718 0 0 0-.0693.5196 40.0684 40.0684 0 0 1 4.4118-3.031c-.2471-.03897-.4768 0-.6934-.06495M58.311 13.0636c.3121-.433.6328-.8443.9621-1.26a2.01153 2.01153 0 0 0-.143-.3464l-.3207.0563a1.19944 1.19944 0 0 1-.026-.1342l-.377.4806c0 .1992-.0347.5499-.0954 1.2037ZM47.9532 27.3485a42.761 42.761 0 0 1 2.1929-7.2917c-.0737-.3161-.1343-.537-.1863-.6928a42.89784 42.89784 0 0 0-2.531 8.4175c.1517-.1429.4334-.3248.5244-.433ZM58.6663 9.17523l-.0953.0433s-.0693.32475-.143.71878c.1257-.15155.2643-.29877.3943-.433a.30698.30698 0 0 0-.0281-.1826.30768.30768 0 0 0-.1279-.13349"
      />
      <path
        fill="#47B3E6"
        d="M51.6762 27.9371c.1184-.5542.2484-1.1085.39-1.6627a38.65654 38.65654 0 0 1 6.0066-12.8515h-.195c-.1733.1776-.3684.3464-.546.5153 0-.2295-.026-.3377-.026-.5629a39.1579 39.1579 0 0 0-4.3338 8.0192c0 .5369.0346.7664.065 1.4808-.1474-.0303-.3077-.0822-.5591-.1515.1777.368.3987.7231.1994 1.1734l-.1864-.0996-.1257.1689a.867.867 0 0 1-.208-.3074c-.2643.8053-.5027 1.6194-.7194 2.4507-.0693.2685-.1343.537-.195.8054.0837.0328.1649.0719.2427.1169-.026.3075-.0954.7448-.117.918.1038.0085.2082.0085.312 0M53.1019 1.92694v-.29877h-.169c-.3294.3464-.6385.69425-.9275 1.04353-.0433.20785-.0823.43301-.117.62786.4016-.46476.8133-.9223 1.2352-1.37262M46.7009 3.84496c.4594-.58888.9274-1.20807 1.4041-1.79262a.55645.55645 0 0 1-.1647-.07794.50452.50452 0 0 1 0-.11258c-.4723.57589-.9361 1.15611-1.3824 1.75365a.46199.46199 0 0 0 .039.1732.15145.15145 0 0 1 .0866.05629M46.315 4.35594l-.065-.09526a2.57144 2.57144 0 0 0-.6284 1.0825c.2297-.32908.4334-.66249.6934-.98724ZM44.8153 6.52981c.0477-.22516.0997-.433.143-.64517a52.69942 52.69942 0 0 0-1.0574 1.64108v.433c.299-.48929.611-.96992.9274-1.44623M48.2131 1.92681l.4334-.49795a1.36097 1.36097 0 0 0-.273 0c-.026.13856-.13.48496-.143.51527M45.071 1.93117c.4031-.52826.8191-1.04786 1.2395-1.56313h-.1127c-.3857.4763-.7714.95693-1.1441 1.44622v.11691M55.8625 6.52972c-.2341.26413-.4594.53259-.6848.80106a.1905.1905 0 0 0 .0685.04971.19044.19044 0 0 0 .0832.01523 1.0076 1.0076 0 0 0 .1214 0c.16-.28062.3047-.56971.4333-.866M52.8936 10.5175a1.29027 1.29027 0 0 0-.2166.1126l-.1344.1948s.0347.3074.078.5976h.0433c.3179-.4706.6429-.9382.9751-1.403a.79624.79624 0 0 1-.2643.0563 1.5913 1.5913 0 0 1-.4681.433l-.013.0087ZM56.6253 5.67241l-.3294.37238c.1127.07794.1777.37671.1777.38104a.38172.38172 0 0 1 0 .06928c.156-.17753.312-.35506.4724-.52826.1603-.1732.4333-.46764.6544-.69713l-.2427-.37238c-.247.25547-.4897.51527-.7324.77507ZM48.9326 18.2466v-.026c-.195.1473-.2297.1689-.4897.6712a1.43175 1.43175 0 0 0-.221-.0433 44.9076 44.9076 0 0 0-2.1149 6.4647c.0349.231.0581.4637.0693.6971-.0822.032-.1661.0594-.2513.0823-2.5201 11.2321-.629 23.0022 5.2829 32.882.1779.0575.347.1391.5027.2425a.99352.99352 0 0 1 .0997-.0822c-3.7281-6.0851-5.9341-12.978-6.4312-20.0953-.4972-7.1173.7292-14.2495 3.5752-20.793M58.0378 4.38616a1.1332 1.1332 0 0 0 0-.16887l-.5114.5196c.1299.10989.2761.19899.4333.26413-.0216-.22516-.0606-.24248-.039-.35073.0217-.10825.091-.18186.1387-.26413"
      />
      <path
        fill="#47B3E6"
        d="M44.7288 25.075a2.16453 2.16453 0 0 1-.2296-.3854 1.38358 1.38358 0 0 1-.0651-.2295c-2.8818 11.2053-1.461 23.0824 3.9828 33.2934.5114.4634.6717.5803.8104.5846-5.649-10.1226-7.2561-22.0056-4.4985-33.2631ZM49.106.88331c.1517-.1732.3033-.3464.4594-.51527h-.3034c-.1474.16454-.3034.32908-.4334.49795h.2904M53.5439 12.596c.08.1963.117.4075.1083.6192.6588-1.0334 1.3623-2.0437 2.1106-3.031-.0347-.1082-.2817-.30739-.2861-.3377-.6847.8891-1.3304 1.8013-1.9371 2.7366M56.6988 9.0152c.2687-.32475.5374-.6495.8148-.96559l-.0347-.05629c-.026-.03464-.0997-.03464-.1474-.02598a.55434.55434 0 0 1-.078-.02598 1.12173 1.12173 0 0 1-.104-.1299c-.3033.3464-.598.69713-.8884 1.05219.1647 0 .3424.02165.4334.15155M57.8646 7.65982c.2514-.28145.5114-.5629.7715-.866 0 0-.0217-.03897-.0347-.06495a.78392.78392 0 0 0-.2687-.23815c-.2904.30743-.5764.61919-.8668.93095.134.06491.2642.13719.3901.2165M59.3207 5.49474a1.6713 1.6713 0 0 0 .39.22516l.3511-.34207c0-.0433.117-.32908.117-.33341-.0737-.08227-.1257-.06062-.2211-.16887-.2123.20784-.4333.41135-.637.61919Z"
      />
      <path
        fill="#47B3E6"
        d="M46.8655 31.5703a42.74547 42.74547 0 0 0 1.6381 16.887c.039-.2825.1043-.5609.195-.8313a42.40071 42.40071 0 0 1-1.3998-16.021c.1127-1.1201.2716-2.2314.4768-3.3341a.74557.74557 0 0 0-.3814-.3248c-.221 1.1908-.4031 2.3988-.5287 3.6156M51.8231 56.3897c.4767.866.9809 1.732 1.5125 2.598.2276.1343.43.3072.5981.5109a7.7937 7.7937 0 0 0 1.0964 1.6714.38952.38952 0 0 0 .1647-.2208 42.77136 42.77136 0 0 1-2.8603-4.4989c-.1863 0-.3554-.0303-.5114-.0476M64.777 1.21672a.58568.58568 0 0 1 0 .12557v.10392c.5114-.37238 1.0271-.73177 1.5472-1.07817h-.7845c-.3727.25547-.741.5196-1.1094.78806.052.05629.039.14289.0997.19485.0866-.03897.1647-.09959.2557-.13423M44.8459 23.3128a3.8112 3.8112 0 0 0-.1517.459c0 .1126.1084.472.1734.7318a.40096.40096 0 0 1 0-.0693c.0606-.2338.13-.459.1907-.6885a3.68758 3.68758 0 0 0-.2297-.433M48.1916 4.90154c.3077-.433.6154-.81837.9361-1.22106a4.75824 4.75824 0 0 0 .1604-.53693c-.3858.47198-.7671.95261-1.1355 1.4419a1.58055 1.58055 0 0 0-.1907.32908c.0763.00836.1534.00836.2297 0M50.5015 1.70618c-.3034.3464-.6024.70146-.8971 1.05652a3.6937 3.6937 0 0 1-.104.49362c.3077-.38104.6197-.75775.9404-1.1258 0-.11258.0347-.24681.0607-.40269"
      />
      <path
        fill="#47B3E6"
        d="M40.5728 46.0974c.0954-.0303.0824-.0476.1561-.0649a50.2665 50.2665 0 0 1 .4116-21.8044c1.7312-7.1506 5.0109-13.8349 9.6081-19.5818.0996-.30743.2253-.6062.3207-.9093a49.83418 49.83418 0 0 0-2.3749 3.07863 3.32263 3.32263 0 0 1-.2427.58455s-.0304-.02165-.0867-.11258c-4.0951 5.9342-6.8756 12.6733-8.1558 19.7669a50.61628 50.61628 0 0 0 .732 21.3681c.13.3075.208.4634.3207.7751 0 .039 0 .1472-.0433.2641l.195.6885c.117.1342.2817.2988.4984.5023-.2687-.866-.5114-1.732-.7281-2.598-.312-.905-.3467-1.1215-.6111-1.9312M53.0498 4.23468c-.3684.433-.7238.866-1.0748 1.299.0358.14727.0461.29959.0303.45032.2037-.25114.4031-.50228.6111-.75342.117-.25547.2687-.61486.4334-.9959ZM43.7324 11.9768c.13-.2468.2557-.4979.39-.7447a.99605.99605 0 0 1-.0997-.2815c-.156.2815-.3077.5673-.4333.866a.27253.27253 0 0 1 .091 0c.026.0736.052.1299.0736.1776"
      />
      <path
        fill="#47B3E6"
        d="M39.4719 23.04a51.92541 51.92541 0 0 1 3.3283-9.1883v-.0303l-.1777-.1083c-3.8031 8.0349-5.4845 16.9087-4.8841 25.7765.039.0433.117.0823.117.1343 0 .2987 0 .5932-.039.8876.052.5803.1126 1.1561.182 1.732l.299.6149A51.61368 51.61368 0 0 1 39.4719 23.04ZM64.9545 3.25639c-.0606.18619-.104.26413-.2643.66249A40.74313 40.74313 0 0 1 69.1843.84025c.2774-.16454.5591-.32475.8408-.48063h-1.3002a43.30038 43.30038 0 0 0-3.766 2.53305 1.95545 1.95545 0 0 1 0 .36372M36.5899 26.7162c-.0607.3421-.117.6798-.169 1.0219.026.0563.104.3248.1517.433.065-.433.1387-.892.2167-1.338a.25452.25452 0 0 1-.1172-.0441.25533.25533 0 0 1-.0822-.0944M51.0908 6.63794c-.2037.26846-.403.54125-.6024.80971.0997-.03464.26-.08227.4681-.13856a4.28368 4.28368 0 0 0 .1343-.67115ZM50.8048 10.2534l.1994-.026c.1256-.1949.299-.43301.5113-.71013a.66704.66704 0 0 1 .1604.06062l.0563-.03897c.2384-.34207.4724-.67981.7194-1.01322a.30745.30745 0 0 0-.1603-.06495v-.21217a.63126.63126 0 0 1-.091-.09526 49.1098 49.1098 0 0 0-1.3695 1.93988.91183.91183 0 0 1 0 .1602M51.6584 6.36519c0 .02165.1083-.433.1647-.65816-.1257.15155-.247.30743-.3684.46331.0694.06928.1387.13856.2037.19485ZM56.2045 3.68926c-.338.433-.6197.79239-.9491 1.16477 0 .0866 0 .05629-.0996.37238.9967-1.11425 2.0426-2.17655 3.1376-3.18688-.104-.17753 0-.37238-.039-.55857a50.0348 50.0348 0 0 0-1.9632 1.87489c-.039.14289-.0477.2165-.0867.32042M43.0647 23.9667c1.4765-5.7779 4.0208-11.2291 7.5017-16.07302-.182.10825-.13.10392-.5677.40702l-.0693-.06495c-4.288 6.15085-7.0906 13.21105-8.1876 20.62625a48.4553 48.4553 0 0 0 1.8646 22.1109c.156.3637.2947.7274.2947.7318.1541.055.2904.1508.3944.2771-3.2113-9.0041-3.6401-18.7646-1.2308-28.0151Z"
      />
      <path
        fill="#00A4E1"
        d="M36.7854.36804h-2.2883C27.3671 11.5123 23.7647 24.5449 24.1597 37.7656c.3951 13.2207 4.7693 26.0154 12.552 36.7148h2.2926c-8.0071-10.6023-12.5211-23.4273-12.9186-36.7032-.3975-13.276 3.3413-26.3477 10.6997-37.40916Z"
      />
      <path
        fill="#fff"
        d="M27.3636 35.8048C27.3456 23.149 31.1868 10.7881 38.3757.36804h-1.5905C29.4268 11.4295 25.6881 24.5012 26.0856 37.7772c.3975 13.2759 4.9115 26.1009 12.9185 36.7032h1.6469c-8.6332-11.0446-13.3115-24.6619-13.2874-38.6756Z"
      />
      <g fill="currentColor">
        <path d="M96.2922 29.9592h9.3088l-.559 1.758h-6.7172v4.5768h6.1582v1.7839h-6.1582v5.0315h6.7392l.602 1.7796h-9.3738V29.9592ZM117.064 29.9548h1.825l6.531 14.9342h-2.072l-1.599-3.6026h-7.545l-1.595 3.6026h-2.098l6.553-14.9342Zm.914 2.6759-2.986 6.8111h5.951l-2.965-6.8111ZM130.447 29.9548h6.344c2.718 0 4.663 1.732 4.663 4.0832 0 2.165-1.079 3.2518-3.15 3.832l3.731 7.019h-2.197l-3.606-6.7115h-3.731v6.7115h-2.054V29.9548Zm2.054 1.732v4.7327h3.9c1.864 0 2.882-.8271 2.882-2.3815 0-1.5545-1.018-2.3426-3.033-2.3426l-3.749-.0086ZM146.586 29.9592h12.147v1.8013h-5.057V44.889h-2.033V31.7605h-5.057v-1.8013ZM164.289 29.9592h2.05v6.3348h7.446v-6.3348h2.049V44.889h-2.049v-6.7721h-7.446v6.7721h-2.05V29.9592ZM96.2316 59.5461h8.2084l-.165.9309h-7.0467v5.8802h6.1147v.9353h-6.1147v7.1834h-.9967V59.5461ZM109.956 59.5461h1.015v9.9244c0 3.031 1.638 4.6157 4.827 4.6157 2.865 0 4.416-1.6151 4.416-4.5551v-9.985h.997v9.8594c0 3.6459-1.967 5.5944-5.66 5.5944-3.501 0-5.595-2.0698-5.595-5.5294v-9.9244ZM127.946 59.5461h1.413l8.706 13.5875V59.5461h1.015v14.9298h-1.266l-8.871-13.8127v13.8127h-.997V59.5461ZM145.962 59.5461h5.14c4.043 0 6.652 3.031 6.652 7.7507 0 2.2949-.68 4.1178-2.011 5.4255-1.261 1.221-2.838 1.758-5.283 1.758h-4.498V59.5461Zm1.014.892v13.1112h3.606c2.114 0 3.423-.4546 4.481-1.5328 1.057-1.0782 1.655-2.8145 1.655-4.8236 0-2.165-.641-4.0832-1.759-5.196-1.019-1.0349-2.427-1.5545-4.295-1.5545l-3.688-.0043ZM96.6433.37244h5.4127c3.004 0 4.806 1.299 4.806 3.43802 0 2.46377-2.258 3.10461-3.501 3.464.775.10236 1.53.32592 2.236.66249a3.59355 3.59355 0 0 1 1.416 1.33551c.341.56683.518 1.21644.512 1.87734 0 1.3683-.806 4.1438-4.953 4.1438h-5.9287V.37244Zm.9968.82703v5.65498h3.7489c2.635 0 4.481-1.20374 4.481-2.94007s-1.452-2.71491-3.835-2.71491h-4.3949Zm0 6.495v6.75913h4.8109c2.405 0 4.021-1.299 4.021-3.2691 0-2.19536-1.989-3.46405-5.348-3.46405l-3.4839-.02598ZM113.354.37244h8.854l-.438.93095h-7.419v5.86282h6.548v.93096h-6.548v6.27413h7.627l.352.9353h-8.976V.37244ZM127.097.37244h9.846l-8.477 14.04216h8.915v.892H126.85l8.455-14.02486h-8.208v-.9093ZM141.836 7.88927C141.836 3.26915 144.549 0 148.427 0c3.879 0 6.592 3.2908 6.592 8.01917 0 4.51623-2.778 7.79403-6.592 7.79403-3.813 0-6.591-3.3125-6.591-7.91094m12.134.18619c0-4.33001-2.197-7.1445-5.634-7.1445-3.276 0-5.451 2.79717-5.451 6.928 0 4.13085 2.257 7.02325 5.451 7.02325 4.85 0 5.634-5.11805 5.634-6.81541M165.758 6.75051c-3.033-1.07817-4.004-1.84458-4.004-3.12626 0-1.6584 1.391-2.71492 3.588-2.71492 2.198 0 3.368 1.54581 3.901 2.45078l.867-.66682C169.243 1.53718 168.077.039 165.251.039c-2.825 0-4.554 1.34663-4.554 3.54195 0 2.54604 2.6 3.464 4.602 4.16546 2.323.80538 4.416 1.75798 4.416 3.74549 0 1.9874-1.733 3.3341-4.208 3.3341-3.398 0-4.455-2.3989-4.871-3.5376l-.867.6624a6.06782 6.06782 0 0 0 2.238 2.7884 6.07216 6.07216 0 0 0 3.422 1.0437c3.172 0 5.348-1.784 5.348-4.4123 0-2.5287-2.167-3.58522-5.036-4.62009" />
      </g>
      <defs>
        <radialGradient
          id="a"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-76.3439 0 0 -76.2774 88.6443 35.1731)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#008ED3" />
          <stop offset=".79" stopColor="#008ED3" />
          <stop offset=".82" stopColor="#008BD0" />
          <stop offset=".84" stopColor="#0082C6" />
          <stop offset=".86" stopColor="#0074B5" />
          <stop offset=".88" stopColor="#005F9E" />
          <stop offset=".89" stopColor="#005997" />
          <stop offset=".96" stopColor="#00264A" />
          <stop offset=".97" stopColor="#002041" />
          <stop offset="1" stopColor="#002041" />
        </radialGradient>
        <radialGradient
          id="c"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-63.0175 0 0 -62.9626 90.1096 35.0168)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0062AB" />
          <stop offset=".36" stopColor="#0062AB" />
          <stop offset=".46" stopColor="#005698" />
          <stop offset=".65" stopColor="#003766" />
          <stop offset=".77" stopColor="#002041" />
          <stop offset=".8" stopColor="#072342" />
          <stop offset=".83" stopColor="#1A2C45" />
          <stop offset=".87" stopColor="#393B49" />
          <stop offset=".91" stopColor="#654F50" />
          <stop offset=".95" stopColor="#9C6958" />
          <stop offset="1" stopColor="#B27865" />
        </radialGradient>
      </defs>
    </svg>
  );
}

BEFLogo.propTypes = {
  width: T.number
};

export default BEFLogo;
