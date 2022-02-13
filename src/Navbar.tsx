import { Link } from "react-router-dom";
import { styled, Stack } from "./components";

const Header = styled("header", {
  backgroundColor: "black",
  padding: "10px 15px",
  height: "40px",
  position: "sticky",
});

const NavLink = styled(Link, {
  color: "$accentText",
  textDecoration: "none",
  borderRadius: "$3",
  background: "$accentBg",
  padding: "$2",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "$accentBgHover",
  },
});

export default function Navbar() {
  return (
    <Header>
      <Stack css={{ stackGap: "$4" }}>
        <NavLink to="/birds">Birds</NavLink>
        <NavLink to="/test">Test</NavLink>
        <NavLink to="/stats">Stats</NavLink>
      </Stack>
    </Header>
  );
}
