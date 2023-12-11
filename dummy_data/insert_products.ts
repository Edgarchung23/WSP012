import { Client } from "pg";
import dotenv from "dotenv";
// import { hashPassword } from "./hash";
dotenv.config();

const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
// <------------------------------------------------------------------------------------------------>
main();
async function main() {
  await client.connect();
  await insertCategory();
  await insertProduct();
  await insertProductVariant();
  await client.end();
}

// <---------------------------------------INSERT PRODUCT TYPE------------------------------------------>
type insertProductType = {
  name: string;
  description: string;
  brand: string;
  material: string;
  category_id: number;
  unit_price: number;
  image: string;
};
type insertProductVariantType = {
  color: string;
  size: string;
  thickness: number;
  unit_price: number;
  storage_count: number;
  product_id: number;
  image: string;
};
// <---------------------------------------INSERT CATEGROY---------------------------------------->

async function insertCategory() {
  await client.query(
    `INSERT INTO category (name)
    VALUES ($1),($2),($3),($4)
    `,
    ["按摩槍", "按摩波", "瑜伽墊", "瑜伽波"]
  );
}

// <---------------------------------------INSERT PRODUCTVARIANT------------------------------------------------------>
async function insertProductVariant() {
  const result = await client.query(`SELECT * FROM product WHERE name = $1`, [
    "天然橡膠瑜伽墊 | 體位線版",
  ]);
  let productVariant_id = result.rows[0].id;
  const productVariantData: insertProductVariantType[] = [
    {
      product_id: productVariant_id,
      color: "粉紅色",
      size: "183 x 68cm",
      thickness: 5,
      unit_price: 588,
      storage_count: 8,
      image: "yoga_mat_3.webp",
    },
    {
      product_id: productVariant_id,
      color: "淺紫色",
      size: "183 x 68cm",
      thickness: 5,
      unit_price: 590,
      storage_count: 0,
      image: "yoga_mat_3_lightpurple.webp",
    },
    {
      product_id: productVariant_id,
      color: "淺紫色",
      size: "100 x 68cm",
      thickness: 5,
      unit_price: 480,
      storage_count: 10,
      image: "yoga_mat_3_lightpurple.webp",
    },
  ];

  for (let entry of productVariantData) {
    await client.query(
      `INSERT INTO product_variant (product_id,color,size,thickness,unit_price,storage_count,image) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        entry.product_id,
        entry.color,
        entry.size,
        entry.thickness,
        entry.unit_price,
        entry.storage_count,
        entry.image,
      ]
    );
  }
}

// <---------------------------------------------------INSERT PRODUCTT---------------------------------------------------------->
async function insertProduct() {
  const result = await client.query(
    `SELECT * FROM category WHERE name = $1 OR name = $2 OR name = $3 OR name = $4`,
    ["按摩槍", "按摩波", "瑜伽墊", "瑜伽波"]
  );
  const productCategory_Massagegun = result.rows[0].id;
  const productCategory_Massageball = result.rows[1].id;
  const productCategory_Yogamat = result.rows[2].id;
  const productCategory_Yogaball = result.rows[3].id;
  const productDetails: insertProductType[] = [
    {
      name: "M2降噪筋膜按摩槍",
      description:
        "全新肌肉槍M2降噪功能升級，令按摩時更寧靜，加入AI模式及自動模式，10mm按摩深度大肌肉群，輕鬆滲透，包括漸弱、漸強及波浪模式，令便攜式按摩體驗昇華。配合6個不同形狀按摩頭，針對你不同部位的肌肉酸痛問題。底部加入電量顯示屏，更清晰知道電量消耗。",
      brand: "Booster",
      material: "矽膠",
      category_id: productCategory_Massagegun,
      unit_price: 888,
      image: "gun-1-blue.png",
    },
    {
      name: "燈光版Smart-Hit深度筋膜按摩槍",
      description:
        "全新Booster燈光模式肌肉槍降噪功能升級，令按摩時更寧靜，加入AI模式及自動模式，智能擊打Smart-Hit 控制技術兩種模式8個檔位，6種不同按摩頭，實施監控使用者施加的壓力，並快速調整電機扭矩、轉速輸出帶來快慢，輕重無縫切換的擊打體驗。底部加入電量顯示屏，更清晰知道電量消耗。",
      brand: "Booster",
      material: "矽膠",
      category_id: productCategory_Massagegun,
      unit_price: 1688,
      image: "gun-2-grey.png",
    },
    {
      name: "M1專業級深層冷熱敷高頻筋膜槍",
      description:
        "冷熱沖擊｜專業級節膜槍｜10秒快速製冷直擊肌肉第五層，實驗證明，GXA筋膜槍的Asovres©技術，能更深入鬆弛肌肉組織，並保持穩定精准的擊打頻率。",
      brand: "GXA",
      material: "磨砂",
      category_id: productCategory_Massagegun,
      unit_price: 688,
      image: "gun-3-grey.png",
    },
    {
      name: "方形M2升級筋膜按摩槍",
      description:
        "意大利無刷電機｜降噪筋膜槍｜矢量擊打控制技術｜六種不同按摩頭全新肌肉槍M2降噪功能升級，令按摩時更寧靜，加入AI模式及自動模式，10mm按摩深度大肌肉群，輕鬆滲透，包括漸弱、漸強及波浪模式，令便攜式按摩體驗昇華。配合6個不同形狀按摩頭，針對你不同部位的肌肉酸痛問題。底部加入電量顯示屏，更清晰知道電量消耗。",
      brand: "Booster",
      material: "磨砂",
      category_id: productCategory_Massagegun,
      unit_price: 688,
      image: "gun-4-black.png",
    },
    {
      name: "T型深度筋膜按摩槍",
      description:
        "降噪筋膜槍｜矢量擊打控制技術｜15種不同按摩頭全新T型肌肉槍降噪功能升級，區別於市場上的95%的各類筋膜槍，BOOSTERT採用了高達12mm的物理振幅，可以將振動傳遞到80mm厚的深層肌肉，瞬間擊潰深層乳酸，帶來無比酸爽快感。5小時超長續航，12mm按摩深度大肌肉群，輕鬆滲透，包括5種力度，超強震動深層放鬆，令便攜式按摩體驗昇華。配合15個不同形狀按摩頭，針對你不同部位的肌肉酸痛問題。 ",
      brand: "Booster",
      material: "矽膠",
      category_id: productCategory_Massagegun,
      unit_price: 688,
      image: "gun-5-silver.png",
    },

    //<---------------------------------------------------------YOGA BALL--------------------------------------------------------->
    {
      name: "電動瑜伽肌肉按摩筋膜球",
      description:
        "輕巧便攜｜輔助按摩｜環保材質｜四檔可換，遠離離延遲性肌肉痠痛DOMS症狀，運動後肌肉會產生乳酸，如不注重肌肉放鬆，會出現肌肉酸痛、腰背酸痛現象，長期得不到有效按摩還會形成肌肉塊。",
      brand: "Yottoy",
      material: "矽膠",
      category_id: productCategory_Massageball,
      unit_price: 388,
      image: "massage_ball_1_blue.png",
    },
    {
      name: "深層肌肉按摩筋膜球",
      description:
        "痛點按摩｜消除疲勞｜嚴選矽膠｜方便攜帶全方位按摩頸部、背部、腿部、足步等多處按摩放鬆，運動前激活訓練部位，運動後放鬆緊張肌肉。 小巧便攜 隨時隨地舒適放鬆趕走疲勞，喚醒活力，享受舒適不受限制。",
      brand: "Master of Muscle",
      material: "矽膠",
      category_id: productCategory_Massageball,
      unit_price: 168,
      image: "massage_ball_2_red.png",
    },
    {
      name: "深層肌肉按摩球",
      description:
        "痛點按摩｜消除疲勞｜嚴選PVC｜方便攜帶全方位按摩頸部、背部、腿部、足步等多處按摩放鬆，運動前激活訓練部位，運動後放鬆緊張肌肉。",
      brand: "Master of Muscle",
      material: "矽膠",
      category_id: productCategory_Massageball,
      unit_price: 168,
      image: "massage_ball_3_yellow.png",
    },
    {
      name: "電動瑜伽肌肉按摩筋膜花生球",
      description:
        "四檔模式｜高效按摩｜強勁動力｜靜音降噪肌肉按摩塑造身形全自動按摩球，四擋力度可調節。",
      brand: "Yottoy",
      material: "矽膠",
      category_id: productCategory_Massageball,
      unit_price: 388,
      image: "massage_ball_4_blue.png",
    },
    {
      name: "德國電動深層按摩球",
      description:
        "振動按摩｜2檔調節｜小巧便攜Beurer德國博依電動深層按摩球結合震動力道讓按摩強度更深入，體積小巧輕盈便利攜帶，在家或外出按摩，讓您健康隨時隨地帶著走！塑膠面的凹槽與凸點設計為身體提供支撐，並能幫助固定按摩位置不走位，讓按摩更加精準到位。",
      brand: "Beurer",
      material: "矽膠、ABS樹脂",
      category_id: productCategory_Massageball,
      unit_price: 588,
      image: "massage_ball_5_black.png",
    },

    //<--------------------------------------------------------YOGA MAT----------------------------------------------------------->
    {
      name: "家用加厚靜音減震瑜伽跳繩墊｜體位線版",
      description:
        "輔助跳繩 專業保護靜音減震，家用跳繩墊。高配瑜伽緩衝墊解鎖多種使用方法 ：平板支撐模式，緩沖減震瑜伽兩用；加厚跳繩模式，加厚16MM，隔音加倍。",
      brand: "MEJEY",
      material: "環保TPE",
      category_id: productCategory_Yogamat,
      unit_price: 488,
      image: "yoga_mat_1.png",
    },
    {
      name: "天然橡膠瑜伽墊 | 純淨版(紫色)",
      description:
        "三重防滑 全新升級來自材料學科技flexible PU與天然橡膠的匠心融合。PU吸水層：PU表層百萬透氣孔，迅速吸收汗水。氣夾層：NonWoven科技紡布，隔離排濕，乾爽如初。橡膠基底層：橡膠防滑，緩衝抓地，解決偏移問題。",
      brand: "Yottoy",
      material: "天然橡膠、PU",
      category_id: productCategory_Yogamat,
      unit_price: 488,
      image: "yoga_mat_2.png",
    },
    {
      name: "天然橡膠瑜伽墊 | 體位線版",
      description:
        "三重防滑 全新升級來自材料學科技flexible PU與天然橡膠的匠心融合。PU吸水層：PU表層百萬透氣孔，迅速吸收汗水。透氣夾層：NonWoven科技紡布，隔離排濕，乾爽如初。橡膠基底層：橡膠防滑，緩衝抓地，解決偏移問題。高密度仿生塗層用聚氨酯吸水層，再多的汗也不容易滑倒。",
      brand: "Yottoy",
      material: "天然橡膠、PU",
      category_id: productCategory_Yogamat,
      unit_price: 588,
      image: "yoga_mat_3.png",
    },
    {
      name: "天然橡膠瑜伽墊 | 水波狀紋理版",
      description:
        "5mm純天然橡膠瑜伽墊純天然橡膠材質，可自然降解，彷彿置身於大自然的醇香體驗，取於自然，用於自然。中密度5mm厚度非採自亞馬遜熱帶雨林，使用無毒發泡劑，非偶氮染料，乳膠含量≤1%。熱黏合技術採用加熱工藝黏合，不含塑料，通過加熱處理將各層黏合在一起，避免使用有毒膠水。",
      brand: "Manduka",
      material: "純天然橡膠",
      category_id: productCategory_Yogamat,
      unit_price: 1688,
      image: "yoga_mat_4.png",
    },
    {
      name: "天然橡膠瑜伽墊 | 純淨版(綠色",
      description:
        "純天然橡膠製作瑜伽墊採用彩色純天然橡膠新料製作，工藝要求高，手感細膩，可以雙面替換使用。雙面防滑設計雙面防滑設計，集環保、不吸油、不吸汗、乾濕防滑、不黏手、彈性及穩定性於一身，手感腳感優良。該墊不建議當高強度健身墊使用，不要穿鞋子或瑜伽襪，或會增加墊子不必要的磨損。",
      brand: "iyogasports",
      material: "彩色純天然橡膠",
      category_id: productCategory_Yogamat,
      unit_price: 1588,
      image: "yoga_mat_5.png",
    },

    //<-----------------------------------YOGA MAT---------------------------------------------->
    {
      name: "瑜伽平衡健身半圓平衡球",
      description:
        "全新一代 免充氣平衡瑜伽半球防滑紋理 穩如泰山旋轉磨砂紋，穩定支撐不打滑，特殊的螺紋紋理，可以有效杜絕運動防滑。",
      brand: "MEJEY",
      material: "PE環保物料",
      category_id: productCategory_Yogaball,
      unit_price: 688,
      image: "yoga_ball_1.png",
    },
    {
      name: "防爆瑜伽普拉提球",
      description:
        "防爆工藝 避免損傷採用蜂窩為空發泡技術，遇刺不爆裂，緩慢出氣。光面PVC 防滑耐磨優質選材，防滑耐磨性全面升級。零壓回彈 貼心呵護球體無壓力記憶回彈，能均勻分散壓力，高彈使身體能被托起，避免關節軟組織受損。",
      brand: "ALTUS",
      material: "PVC",
      category_id: productCategory_Yogaball,
      unit_price: 388,
      image: "yoga_ball_2.png",
    },
    {
      name: "防爆迷你瑜伽普拉提球",
      description:
        "雙層加厚防爆球體表面使用雙層結構，所以比一般瑜伽球更厚，兩層各有不同功效，合力保證瑜伽球的安全。內層蜂巢氣囊結構通過高發泡技術，讓球體表面有如密集分佈的蜂巢性氣囊，發生意外穿刺時，球體會緩慢漏氣，確保安全。通過碾壓測試本產品通過專用測試機的150kg滿載防爆測試，450kg滿載瞬間壓力測試。",
      brand: "Master of Muscle",
      material: "PVC",
      category_id: productCategory_Yogaball,
      unit_price: 188,
      image: "yoga_ball_3.png",
    },
  ];

  for (let entry of productDetails) {
    await client.query(
      `INSERT INTO product(category_id,name,description,brand,material,image,unit_price)VALUES($1,$2,$3,$4,$5,$6,$7)`,
      [
        entry.category_id,
        entry.name,
        entry.description,
        entry.brand,
        entry.material,
        entry.image,
        entry.unit_price,
      ]
    );
  }
}
