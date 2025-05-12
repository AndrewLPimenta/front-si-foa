export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-secondary/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-secondary rounded-full animate-spin"></div>
      </div>
    </div>
  )
}
