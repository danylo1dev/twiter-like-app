import { Card, CardContent, Typography } from "@mui/material";
import { Profile } from "./profile";
export const PostCard = ({ text, createAt }) => {
  return (
    <Card sx={{ minWidth: "320px", minHeight: "160px" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Profile avatarSrc={""} fullName={"Cool Dude"} userId={"dkaskdks"} />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
          consequatur eaque tempore accusantium facere autem veritatis
          perspiciatis odit dolores possimus neque dignissimos nemo harum
          temporibus nam porro debitis dicta totam sed repellendus quibusdam?
          Eos sint minima error suscipit. Ratione quam dolore quis in minima
          ducimus delectus, unde inventore nisi culpa iusto deserunt ab dicta
          architecto quibusdam consequuntur magnam totam temporibus! Ducimus
          quibusdam expedita voluptates illo commodi rerum magnam dolore atque.
          Laborum, odit praesentium quisquam, ex accusamus veritatis tempora
          vitae, eaque quidem perferendis iste! Minima laboriosam, sunt
          similique eveniet dicta soluta ad aliquam. Quisquam culpa dicta
          laborum sint voluptates illo, adipisci ipsum impedit dignissimos,
          doloremque saepe eaque quod repellat? Sit explicabo earum qui
          voluptatibus voluptatem, labore alias consequuntur? Earum officiis
          magni iusto voluptas aliquam, aliquid molestias eius reiciendis eos
          possimus ullam aut amet doloribus, nemo dolore ab sint praesentium
          explicabo at odio repellat. Ipsa, repellat consequuntur.
        </Typography>
        <Typography variant="body2">{createAt}</Typography>
      </CardContent>
    </Card>
  );
};
