


testObjSuccess = {
    "success": true,
    "message": "Successfully saved answers.",
    "data": []
}


testObjFail = {
    "success": false,
    "message": "Missing post data, required keys: answers, uid, score, time.",
    "data": []
}

// eRror message
if(testObjFail.success) {
    console.log('All ok')
} else {
    console.log('call Mike on 07812222222')
}

