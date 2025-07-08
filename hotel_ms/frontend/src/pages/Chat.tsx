import { useState } from "react";
import { Input, Button, List, Typography } from "antd";
import axios from "axios";

export default function Chat() {
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
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "Error" }]);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <List
        dataSource={messages}
        renderItem={(m) => (
          <List.Item>
            <Typography.Text strong>{m.role === "user" ? "我" : "AI"}:</Typography.Text>
            <span style={{ marginLeft: 8 }}>{m.content}</span>
          </List.Item>
        )}
      />
      <Input.TextArea rows={3} value={input} onChange={(e) => setInput(e.target.value)} />
      <Button type="primary" block onClick={send} style={{ marginTop: 8 }}>
        发送
      </Button>
    </div>
  );
}
