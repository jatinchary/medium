

const Loading = () => {
  return (
    <div>
        <div className="flex items-center justify-center h-screen">
    <div
        className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full"
        style={{
            animation: "spin 1s linear infinite"
        }}
    ></div>
</div>
</div>
  )
}

export default Loading