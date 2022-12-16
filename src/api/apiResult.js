const apiLink = 'https://mobiletest.etherscan.io/v1/api.ashx?key=796EBD8C9157B9EF4FF72CE7BCCEE';

export async function apiGetSearch(data) {

    let response = await fetch(apiLink + `&module=${data.module}` + `&term=${data.term}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    })

    let result = await response.json();

    if (response.status !== 200){
        throw result;
    }

    return result;
    
}

export async function apiGetResult(data) {

    let response = await fetch(apiLink + `&module=${data.module}` + `&value=${data.value}` + `&type=${data.type}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    })

    let result = await response.json();

    if (response.status !== 200){
        throw result;
    }

    return result;
    
}