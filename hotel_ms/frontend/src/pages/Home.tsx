import { Carousel, Card, Typography, Divider } from "antd";
import ChatWidget from "../components/ChatWidget";

const placeholderImgs = [
  "https://placehold.co/1200x400/8ecae6/ffffff?text=Ghibli+Scenery+1",
  "https://placehold.co/1200x400/219ebc/ffffff?text=Ghibli+Scenery+2",
  "https://placehold.co/1200x400/023047/ffffff?text=Ghibli+Scenery+3",
];

export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      <Carousel autoplay>
        {placeholderImgs.map((src) => (
          <img key={src} src={src} style={{ width: "100%", height: 400, objectFit: "cover" }} />
        ))}
      </Carousel>

      <div style={{ maxWidth: 1000, margin: "24px auto" }}>
        <Typography.Title level={2}>欢迎来到尼克的移动城堡</Typography.Title>
        <Typography.Paragraph>
          这是一家以狐狸尼克为主题的奇幻酒店，充满了温馨、浪漫与童趣。酒店的每一个角落都融入了尼克和它朋友们的故事，让您仿佛置身于一个真实的童话世界。每一间房间都经过精心设计，带您重温那些美好的奇幻时光。
        </Typography.Paragraph>
        <Divider />

        <Typography.Title level={2}>客房展示</Typography.Title>
        <Card cover={<img src="https://placehold.co/1000x300/a2d2ff/ffffff?text=Room+Preview" />} style={{ marginBottom: 24 }}>
          <Card.Meta description="舒适宽敞的客房，配备现代化设施，让您享受如家般的温暖。" />
        </Card>

        <Typography.Title level={2}>入住政策</Typography.Title>
        <Typography.Paragraph>
          入住时间：14:00 以后 | 退房时间：12:00 以前<br />
          禁止携带宠物进入酒店。<br />
          酒店提供 24 小时前台服务与免费 Wi-Fi。
        </Typography.Paragraph>
      </div>

      <ChatWidget />
    </div>
  );
}
