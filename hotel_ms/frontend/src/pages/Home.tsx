import { Carousel, Card, Typography } from "antd";
import ChatWidget from "../components/ChatWidget";

// 正确导入本地图片
import img1 from "../assets/images/nik.jpeg";
import img2 from "../assets/images/img.png";
import img3 from "../assets/images/img_1.png";

const localImgs = [img1, img2, img3];

export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      {/* 轮播图容器 - 与内容区域保持相同宽度 */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px" }}>
        <Carousel autoplay style={{ marginTop: 24 }}>
          {localImgs.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                style={{
                  width: "100%",
                  height: "60vh",
                  maxHeight: 400,
                  minHeight: 300,
                  objectFit: "cover"
                }}
                alt="风景展示"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* 内容容器 - 保持与轮播图相同的宽度 */}
      <div style={{ maxWidth: 1000, margin: "24px auto", padding: "0 16px" }}>
        <Typography.Title level={2} style={{ color: "#3a0ca3" }}>
          欢迎来到尼克的移动城堡
        </Typography.Title>

        {/* 动漫风格欢迎词部分 */}
        <div style={{
          backgroundColor: "#f8f9fa",
          borderRadius: 12,
          padding: 24,
          marginBottom: 32,
          border: "1px dashed #ff9e7d"
        }}>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            <span style={{
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              color: '#FF6B6B',
              fontSize: '1.2em'
            }}>
              (◠ᴥ◠)ノ===≡つ✧ 你好！我是尼克狐尼克
            </span>
            <span role="img" aria-label="fox">🦊</span>

            <div style={{ marginTop: 12 }}>
              <span style={{ fontStyle: 'italic', color: '#6D4C41' }}>
                （毛茸茸的耳朵一抖，金绿瞳仁弯成月牙）
              </span>
              ：“哇哦——这位穿越次元壁的贵宾！
              <span role="img" aria-label="sparkles">✨</span>
              （爪尖优雅划过空中，带起一道星尘特效）欢迎光临移动城堡！本狐可是您24小时在线的专属导航员~”
            </div>

            <div style={{ marginTop: 12 }}>
              <span style={{ fontStyle: 'italic', color: '#6D4C41' }}>
                （突然从柜台后翻出，披风飒啦扬起）
              </span>
            </div>

            <div style={{ marginTop: 12 }}>
              “让我猜猜！
              <span style={{ fontStyle: 'italic', color: '#6D4C41' }}>
                （竖起尾巴转圈）
              </span>
              您是刚在超级英雄片场拍完打戏？还是从魔法学院逃课来度假？
              <span style={{ fontStyle: 'italic', color: '#6D4C41' }}>
                （压低声音，爪垫神秘兮兮抵住嘴唇）
              </span>
              别担心！本店有三大法则——”
            </div>

            <div style={{
              marginTop: 16,
              padding: 12,
              background: 'linear-gradient(45deg, #FFD3A5, #FD6585)',
              borderRadius: 8,
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              🌟动漫风酒店欢迎法则🌟
            </div>

            <ul style={{
              listStyleType: 'none',
              paddingLeft: 0,
              marginTop: 16
            }}>
              <li style={{ marginBottom: 8 }}>
                <span style={{ color: '#FF9E7D', fontWeight: 'bold' }}>免惊吓Buff</span>：枕头藏了100只瞌睡精灵！
                <span style={{ fontStyle: 'italic', color: '#6D4C41' }}>
                  （嘭！揪出云朵抱枕）
                </span>
              </li>
              <li style={{ marginBottom: 8 }}>
                <span style={{ color: '#FF9E7D', fontWeight: 'bold' }}>次元破壁机</span>：浴室的泡泡能变成宝可梦球！
                <span style={{ fontStyle: 'italic', color: '#6D4C41' }}>
                  （哗啦！背景炸开彩虹水花<span role="img" aria-label="water">💦</span>）
                </span>
              </li>
              <li style={{ marginBottom: 8 }}>
                <span style={{ color: '#FF9E7D', fontWeight: 'bold' }}>主角光环灶</span>：早餐煎蛋会"叮！"地冒出金光特效！
                <span style={{ fontStyle: 'italic', color: '#6D4C41' }}>
                  （滋滋~虚拟煎锅弹出<span role="img" aria-label="sparkles">✨</span>+10HP字样）
                </span>
              </li>
            </ul>

            <div style={{ marginTop: 16 }}>
              <span style={{ fontStyle: 'italic', color: '#6D4C41' }}>
                （突然拽过悬浮屏划出弹幕）
              </span>
            </div>

            <div style={{ marginTop: 12 }}>
              "看！隔壁兔朱迪警官的五星好评——
              <span style={{ fontStyle: 'italic', color: '#6D4C41' }}>
                （屏幕闪烁）
              </span>
              『连胡萝卜汁都插着闪电吸管<span role="img" aria-label="lightning">⚡️</span>...这很动物城！』
              <span style={{ fontStyle: 'italic', color: '#6D4C41' }}>
                （眨动左眼射出星星<span role="img" aria-label="star">★</span>）
              </span>
              "
            </div>

            <div style={{
              marginTop: 16,
              fontSize: '1.1em',
              fontWeight: 'bold',
              color: '#3a0ca3'
            }}>
              "所以~
              <span style={{ fontStyle: 'italic', color: '#6D4C41' }}>
                （展开镶金边的电子房卡）
              </span>
              要和我签订契约吗？今夜您可是新番主角哦！"
            </div>
          </Typography.Paragraph>
        </div>

        <Typography.Title level={2} style={{ color: "#3a0ca3" }}>
          客房展示
        </Typography.Title>
        <Card
          cover={
            <img
              src="https://placehold.co/1000x300/a2d2ff/ffffff?text=Room+Preview"
              alt="客房预览"
              style={{ width: "100%" }}
            />
          }
          style={{ marginBottom: 24 }}
        >
          <Card.Meta
            title="豪华主题客房"
            description="舒适宽敞的客房，配备现代化设施，让您享受如家般的温暖。每个房间都有独特的动漫主题装饰！"
          />
        </Card>

        <Typography.Title level={2} style={{ color: "#3a0ca3" }}>
          入住政策
        </Typography.Title>
        <Typography.Paragraph>
          <ul style={{ paddingLeft: 20 }}>
            <li>入住时间：14:00 以后 | 退房时间：12:00 以前</li>
            <li>禁止携带宠物进入酒店（魔法生物需提前申报）</li>
            <li>酒店提供 24 小时前台服务与免费 Wi-Fi</li>
            <li>每个房间配备AI助手，可随时召唤尼克狐尼克</li>
          </ul>
        </Typography.Paragraph>
      </div>

      <ChatWidget />
    </div>
  );
}