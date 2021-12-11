import { useRouter } from "next/router";

const PlayerPage: React.FC = ({}) => {
  const router = useRouter();

  const { player } = router.query;

  return <div>{player}</div>;
};

export default PlayerPage;
