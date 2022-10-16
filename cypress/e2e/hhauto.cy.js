let urlArray=[];
let pageTotal;
let urlCurentOnpage

before(() => {
    cy.request('GET',`https://api.hh.ru/vacancies/?text=Qa&specialization=1.117&period-15&per_page=100&page=1`).then((response)=>{
   
        pageTotal= response.body.pages-2;
        
    })

  })
  

  
describe('hh take url',()=>{
    
    let pagecurent=1;

    it('get url',()=>{
        
        for(let i=0;i<pageTotal;i++){
            

            cy.request('GET',`https://api.hh.ru/vacancies/?text=Qa&specialization=1.117&period-15&per_page=100&page=${pagecurent}`).then((response)=>{
                   


                        for( let x=0;x<response.body.items.length;x++){

                            urlArray.push(response.body.items[i].alternate_url)
                        }
                           
                     })
                
                pagecurent++;
            }
            
            
           
    })


    





})