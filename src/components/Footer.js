export default function Footer() {
   const date = new Date();
   const year = date.getFullYear();

   return (
      <div className="my-5 text-center">
         <span className="">Nan Rodriguez &copy; {year}</span>
      </div>
   );
}
