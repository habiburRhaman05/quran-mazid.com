import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
   <p
  className="arabic-text text-right leading-loose"
  style={{
   
    fontFamily: [
  
      '"Amiri Quran"'
    ].join(", "),
  }}
>
الٓر ۚ تِلْكَ ءَايَـٰتُ ٱلْكِتَـٰبِ وَقُرْءَانٍۢ مُّبِينٍۢ ١ 
</p>
   <p
  className="arabic-text text-right leading-loose"
  style={{
   
    fontFamily: [
  
      '"Scheherazade New"'
    ].join(", "),
  }}
>
الٓر ۚ تِلْكَ ءَايَـٰتُ ٱلْكِتَـٰبِ وَقُرْءَانٍۢ مُّبِينٍۢ ١ 
</p>


    </div>
  );
}
