<?php





if(isset($_POST['message'])){
//    echo '<pre>';
//    print_r($_POST);
    global $arr;
    $arr=  array_merge($arr,$_POST);
}
if(isset($_GET['get'])){
    $arr=array(
        array(
            'id'=>27745711,
            'color'=>'#fffcc',
            'message'=>'撒打算的',
            'current_time'=>rand($_GET['current_time'],50),
        ),
        array(
            'id'=>27745711,
            'color'=>'#fffcc',
            'message'=>'撒打算ssss的',
            'current_time'=>rand($_GET['current_time'],50),
        ),
        array(
            'id'=>27745711,
            'color'=>'#fffcc',
            'message'=>'撒打算的',
            'current_time'=>rand($_GET['current_time'],50),
        ),
    );


    for($i=0;$i<rand(0, 9);$i++){
        $arr=  array_merge($arr,$arr);
    }
    
    echo json_encode($arr,true);
}

?>