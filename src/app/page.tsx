import Image from "next/image";
import '../assets/page.css'

export default function Home() {
  return (
    <div className={"container"}>
        <div className={'greeting'}>
            <h1>
                Welcome to Uniform Web!
            </h1>
        </div>
    </div>
  );
}
