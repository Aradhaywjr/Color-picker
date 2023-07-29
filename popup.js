const btn = document.querySelector('.ChangeColorBtn');
const colourValue = document.querySelector('.colourValue');
const colourGrid = document.querySelector('.colourGrid');

btn.addEventListener('click' , async () => 
{
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor,
    }, async(injectionResults) =>{

        const [data] = injectionResults;
        if(data.result){
            const color = data.result.sRGBHex;

            colourGrid.style.backgroundColor = color;

            colourValue.innerText = color;

            try{
                await navigator.clipboard.writeText(color)
            }catch (err) {
                console.error(err);

            }
        }
        
    });
});

async function pickColor() {
    try{

        const eyeDropper = new EyeDropper();

        return await eyeDropper.open();

    }catch(err){
        console.error(err);
    }
}