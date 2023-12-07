
-- insert into category (name) values ('按摩槍');
-- insert into category (name) values ('按摩波');
-- insert into category (name) values ('瑜伽墊');
-- insert into category (name) values ('瑜伽波');

insert into product (name, brand, category_id, unit_price, material , image) values ('M2降噪筋膜按摩槍','Booster',(select id from category where name ='按摩槍'),'$688','磨砂', 'public/image/massage_gun/gun-1-blue.webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('燈光版Smart-Hit深度筋膜按摩槍','Booster', (select id from category where name ='按摩槍'),'$588','磨砂', 'public/image/massage_gun/gun-2-grey.webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('方形M2升級筋膜按摩槍','Booster',(select id from category where name ='按摩槍'),'$588','磨砂', 'public/image/massage_gun/gun-4-black.webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('T型深度筋膜按摩槍','Booster',(select id from category where name ='按摩槍'),'$688','磨砂', 'public/image/massage_gun/gun-5-silver.webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('M1專業級深層冷熱敷高頻筋膜槍','GXA', (select id from category where name ='按摩槍'),'$488','磨砂', 'public/image/massage_gun/gun-3-grey.webp' );

-----------------------------------------------------------------------------------------------------------------

insert into product (name, brand, category_id, unit_price, material , image) values ('深層肌肉按摩筋膜球','Master of Muscle',(select id from category where name ='按摩波'),'$168','矽膠', 'public/image/massage_ball/massage-ball-2-red.webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('電動瑜伽肌肉按摩筋膜球 ','Yottoy', (select id from category where name ='按摩波'),'$388','矽膠', 'public/image/massage_ball/massage-ball-1-pink.webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('深層肌肉按摩球 ','Master of Muscle', (select id from category where name ='按摩波'),'$168','矽膠', 'public/image/massage_ball/massage-ball-3-yellow.webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('電動瑜伽肌肉按摩筋膜花生球 ','Yottoy', (select id from category where name ='按摩波'),'$388','矽膠', 'public/image/massage_ball/massage-ball-4-blue.webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('德國電動深層按摩球 ','Beurer', (select id from category where name ='按摩波'),'$588','矽膠、ABS樹脂', 'public/image/massage_ball/massage-ball-5-black.webp' );

-----------------------------------------------------------------------------------------------------------------

insert into product (name, brand, category_id, unit_price, material , image) values ('家用加厚靜音減震瑜伽跳繩墊｜體位線版 ','MEJEY', (select id from category where name ='瑜伽墊'),'$488','環保TPE', 'public/image/yoga_mat/yoga_mat_1_grey.webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('天然橡膠瑜伽墊 | 純淨版(紫色) ','Yottoy', (select id from category where name ='瑜伽墊'),'$488','天然橡膠、PU', 'public/image/yoga_mat/yoga_mat_2_purple.webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('天然橡膠瑜伽墊 | 體位線版 ','Yottoy', (select id from category where name ='瑜伽墊'),'$588','天然橡膠、PU', 'public/image/yoga_mat/yoga_mat_3_pink.webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('天然橡膠瑜伽墊 | 水波狀紋理版 ','Manduka eKO', (select id from category where name ='瑜伽墊'),'$1688','純天然橡膠', 'public/image/yoga_mat/yoga_mat_4_green.webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('天然橡膠瑜伽墊 | 純淨版(綠色)','iyogasports',(select id from category where name ='瑜伽墊'),'$1588','彩色純天然橡膠', 'public/image/yoga_mat/yoga_mat__green.webp' );

-----------------------------------------------------------------------------------------------------------------

insert into product (name, brand, category_id, unit_price, material , image) values ('瑜伽平衡健身半圓平衡球','MEJEY', (select id from category where name ='瑜伽波'),'$688','PE環保物料', 'public/image/yoga_ball/yoga_ball_1webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('防爆瑜伽普拉提球','ALTUS', (select id from category where name ='瑜伽波'),'$388','PVC', 'public/image/yoga_ball/yoga_ball_2webp' );

insert into product (name, brand, category_id, unit_price, material , image) values ('防爆迷你瑜伽普拉提球','Master of Muscle', (select id from category where name ='瑜伽波'),'$188','PVC', 'public/image/yoga_ball/yoga_ball_3webp' );






























