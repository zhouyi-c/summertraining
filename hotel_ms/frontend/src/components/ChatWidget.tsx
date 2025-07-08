import { useState } from "react";
import { Drawer, FloatButton, Input, Button, List, Typography } from "antd";
import axios from "axios";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    try {
      const res = await axios.post("http://localhost:8000/api/chat", { message: input });
      setMessages([...newMessages, { role: "assistant", content: res.data.reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Error" }]);
    }
  };

  return (
    <>
      <FloatButton type="primary" style={{ right: 24 }} onClick={() => setOpen(true)} description="AI助理" />
      <Drawer title="AI 聊天助手" placement="right" width={360} onClose={() => setOpen(false)} open={open}>
        <List
          dataSource={messages}
          renderItem={(m) => (
            <List.Item>
              <Typography.Text strong>{m.role === "user" ? "我" : "AI"}:</Typography.Text>
              <span style={{ marginLeft: 8 }}>{m.content}</span>
            </List.Item>
          )}
          style={{ height: 400, overflow: "auto" }}
        />
        <Input.TextArea rows={3} value={input} onChange={(e) => setInput(e.target.value)} />
        <Button type="primary" block onClick={send} style={{ marginTop: 8 }}>
          发送
        </Button>
      </Drawer>
    </>
  );
}
