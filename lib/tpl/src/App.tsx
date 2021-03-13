import { ref, FC } from "vvix";

const App: FC = () => {
  const count = ref(0);

  return () => (
    <div
      onClick={() => {
        count.value++;
      }}
    >
      <h1>hello vvix</h1>
      hello world {count.value}
      very welcome PR and Star
      <br></br>
      <a href="https://github.com/JSerFeng/vvix">github</a>
    </div>
  );
};
export default App;
