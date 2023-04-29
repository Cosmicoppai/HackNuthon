import { Link } from 'react-router-dom';
// import LogoDark from '';
import { styled, Box } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '100px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">

      <img src={'/ayur_logo.png'} style={{ height: "100px", width: "200px" }} />
      {/* <LogoDark height={70} width={200} /> */}
    </LinkStyled>
  );
};

export default Logo;
