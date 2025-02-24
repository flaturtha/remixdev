import { Button } from "talesofmurder-ui";

export default function TestUI() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Shared UI Component Test</h1>
      <Button variant="primary" onClick={() => alert("Button Clicked!")}>
        Click Me
      </Button>
    </div>
  );
}


