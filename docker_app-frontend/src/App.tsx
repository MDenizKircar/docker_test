import { ToastContainer } from "react-toastify"
import Button from "./components/Button"


import { fetcher, pushRequest } from "./services/service"
import useSWR from "swr"


function App() {

  const { data, mutate } = useSWR('items', fetcher)

  const handlePush = async () => {
    const res = await pushRequest()
    console.log(res)
    if(res) mutate()
  }

  return (
    <main
      className='w-dvw h-dvh flex flex-col justify-center items-center select-none'
    >
      <ToastContainer />
      <section
        className='flex flex-col gap-6 justify-center items-center'
      >

        <h1 className="text-xl">
          Sample Docker App
        </h1>
        
        
        <Button onClick={handlePush}>
          Push a Random Name!
        </Button>
        
        <div className='flex flex-col justify-center items-center gap-2'>
          <h2 className='text-neutral-700'>last 3 added names:</h2>
          <div
            className='flex flex-row gap-4'
          >
            {data && data.length 
              ? data.map((result: {id: number, name: string}) => (
                <span
                  key={result.id}
                  className='
                    px-2 py-1 bg-neutral-100/50
                    rounded-full border border-neutral-400 
                    text-neutral-500
                    hover:text-black hover:border-neutral-600 hover:bg-neutral-100
                    transition-all
                  '
                >
                  {result.name}
                </span>
              ))
              : <span
                className='
                  px-2 py-1 bg-neutral-100/50
                  rounded-full border border-neutral-400 
                  text-neutral-500
                  transition-all
                '
              >
                none
              </span>
            }
          </div>
          
        </div>

        


        {/* <div className='flex flex-col justify-center items-center gap-2'>
          <h2 className='text-neutral-700'>methods:</h2>
          <div className='flex flex-row gap-4'>
            <Button onClick={() => getRequest(1)}>Get Public</Button>
            <Button onClick={() => getRequest(1)}>Get Private</Button>
          </div>
        </div> */}

        
          {/* <div className='flex flex-col justify-center items-center gap-2'>
            <h2 className='text-neutral-700'>admin role specific section:</h2>
            <div className='flex flex-row gap-4'>
              <span
                  className='
                    px-2 py-1 bg-blue-500/10
                    rounded-full border border-blue-500 
                    text-blue-500
                    hover:text-white hover:bg-blue-500
                    transition-all
                  '
                >
                  Admin!
                </span>
            </div>
          </div> */}

      </section>

    </main>
  )
}

export default App
