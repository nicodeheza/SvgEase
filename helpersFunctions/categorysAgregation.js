const group1={
    $group:{
        _id: '$category',
        tags:{$push: '$tags'}
    }
};

const project1 ={
    $project:{
        tags:{
            $cond:[
                {$eq:['$tags',[[]]]}, [[null]], '$tags'
            ]
        }
    }
};

const unwind= {$unwind: '$tags'};

const group2={
    $group:{
        _id: '$_id',
        tags:{$addToSet: '$tags'}
    }
};

const project2={
    $project:{
        category: '$_id',
        _id: 0,
        tags:{
            $cond:[
                {$eq:['$tags', [null]]},
                [],
                '$tags'
            ]
        }
    }
};


const categoryAgregation= [group1, project1, unwind, unwind, group2, project2];

export default categoryAgregation;