import { Provider } from "react-redux";
import { store } from "redux/store";

const Mockstore = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <Provider store={store}>{children}</Provider>
);

export default Mockstore;
