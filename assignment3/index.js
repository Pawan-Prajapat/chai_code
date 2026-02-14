async function getQuote() {
    const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';     // generate random quote
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        // get the data and using dom add the quote and author on the page
        const quote_id = document.getElementById("quotes");
        const quote = document.createElement("div");
        const quote_inner_div = document.createElement("div");
        quote.className = "quote";
        const author = document.createElement("p");
        author.innerText = data.data.author;
        const content = document.createElement("p");
        content.innerText = data.data.content;

        quote_inner_div.appendChild(author);
        quote_inner_div.appendChild(content);
        quote.appendChild(quote_inner_div);
        
        //  copy clickboard button 
        const copy_button = document.createElement("button");
        copy_button.innerText = "COPY";
        copy_button.onclick = function (params) {
            navigator.clipboard.writeText(content.innerText);
        }
        
        // share on the twitter
        const twitter_link = document.createElement("a");
        twitter_link.href = `https://twitter.com/intent/tweet?text=${encodeURI(content.innerText)}`;
        twitter_link.target = "_blank";
        twitter_link.innerText = "Share twitter";

        // set background image 
        quote.style.backgroundImage = "url('https://picsum.photos/200/300?random=1')";

        // export button 
        const export_button = document.createElement("button");
        export_button.innerText = "Export";
        export_button.onclick = function () {
            html2canvas(quote , {
                useCORS: true,
                allowTaint: true
            }).then((canvas)=>{
                let dataUrl = canvas.toDataURL("image/png");
                dataUrl = dataUrl.replace(/^data:image\/png/ , "data:application/octect-stream");
                download(dataUrl , "quote.png" , "image/png");
            })
        }
        quote.appendChild(export_button);
        quote.appendChild(copy_button);
        quote.appendChild(twitter_link);
        quote_id.appendChild(quote);
    } catch (error) {
        console.error(error);
    }
}


getQuote();