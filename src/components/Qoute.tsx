import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
interface QouteProps {
  QouteData: {
    quote: string;
    author: string;
  };
}

const Qoute = ({ QouteData }: QouteProps) => (
  <div className=" flex flex-col items-start justify-between bg-background py-4 px-4 flex-1 rounded-lg shadow-lg">
    <div>
      {" "}
      <div className=" mb-2">
        <FaQuoteLeft />
      </div>
      <p className=" font-bold text-text text-[20px] leading-[20px]">
        {QouteData.quote}
      </p>
      <div className=" mt-2">
        <FaQuoteRight />
      </div>
    </div>

    <h4 className=" mt-5 font-medium text-[14px] text-[#777]">
      {QouteData.author}
    </h4>
  </div>
);

export default Qoute;
