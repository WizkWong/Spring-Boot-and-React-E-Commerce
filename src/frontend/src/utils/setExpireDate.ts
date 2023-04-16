// set time now plus second, minute, hour or year
const setExpireDate = ({ minute }: { minute: number }) => {
  return new Date(Date.now() + minute * 60000);
};

export default setExpireDate;
