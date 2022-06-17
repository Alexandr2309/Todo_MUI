export const transStylesCheck = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};
export const transStylesText = {
  entering: { textDecoration: 'none', opacity: 1 },
  entered: { textDecoration: 'line-through', opacity: .5 },
  exiting: { textDecoration: 'line-through', opacity: .5 },
  exited: { textDecoration: 'none', opacity: 1 },
}
export const closeIconStyles = {
  color: 'red',
  transition: 'transform .2s ease-in-out 0s',
  '&:hover': { transform: 'rotate(-15deg)' },
};
export const paperStyle = {
  borderRadius: 0, p: '5px 0',
  transition: 'transform .1s ease 0s',
  '&:hover': {
    transform: 'scale3d(1.007,1.007,1.007)',
    transition: 'transform .1s ease-in 0s'
  }
}