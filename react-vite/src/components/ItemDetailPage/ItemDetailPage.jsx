import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { getItemThunk } from "../../redux/item"
import { getItemReviewsThunk } from "../../redux/review"
import OpenModalButton from "../OpenModalButton"
import { DeleteReviewModal } from "../DeleteReviewModal/DeleteReviewModal"
import { getReviewsList } from "../../redux/review"
import './itemDetailPage.css'
import { useModal } from '../../context/Modal';
import { addToCartThunk } from "../../redux/cart"
import { getOrdersThunk } from "../../redux/order"
import LoginFormModal from "../LoginFormModal"
import ReviewModal from "../ReviewModal"

function ItemDetailPage(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let {id} = useParams()
    id = Number(id)

    const item = useSelector((state)=>state.items[id])
    let reviews = (useSelector(getReviewsList))
    // let reviews = useSelector((state)=>state.reviews)
    console.log(reviews, "REVIEWS")
    let sessionUser = useSelector((state) => state.session.user);
    const orders = useSelector((state)=>state.orders)

    reviews = [...reviews].reverse();
    let numReviews = reviews.length

    const [timeCheck, setTimeCheck] = useState(true);
    const closeMenu = useModal();

    useEffect(()=>{
        dispatch(getItemThunk(id))
        dispatch(getItemReviewsThunk(id))
        dispatch(getOrdersThunk())

    },[dispatch,id])

    let avgRating = reviews.reduce((accumulator, currentItem)=> accumulator + currentItem.stars, 0)
    avgRating = (avgRating / numReviews).toFixed(2)

    useEffect(() => {
        let timeout;
       
        if (!item || !item.Images || !item.Reviews || !reviews || !orders) {
            timeout = setTimeout(() => setTimeCheck(false), 3000);
            
        }
    
        return () => clearTimeout(timeout);
    }, [item, reviews, orders]);

    if (!item || !item.Images || !item.Reviews || !reviews || !orders && timeCheck) return <h1>Loading...</h1>;
    else if (!item || !item.Images || !item.Reviews || !reviews || !orders && !timeCheck) return <h1>Sorry, please refresh the page</h1>;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleAddToCart = async(id)=>{
        await dispatch(addToCartThunk(id))
        navigate('/cart')
    }

    // Need  to check if the user has purchased the item

    const hasPurchased = (orders) =>{
        const ordersArr = Object.values(orders)
        for (let order of ordersArr){
           let items = order["OrderedItems"]
           for (let item of items){
            if (item.id == id){
                return true
            }

           }
        }
        return false

    }
    // Need to check if the user has already reviewed the item:

    const hasReviewed = (reviews)=>{
        const reviewsArr = Object.values(reviews)
        for (let review of reviewsArr){
            if (review.ownerId == sessionUser.id){
                return true
            }
        }
        return false

    }

    // function that returns a bool for each of these conditions. 


    const canReview = (hasPurchased, hasReviewed, orders, reviews)=>{
       if (hasPurchased(orders) && !hasReviewed(reviews)) return true
       else{
        return false
       }
    }


    return(
        <>
        <div className='item-imgs-info'>

        <div className='item-imgs-container'>


        {item.Images && item.Images.map((image)=>(
            <div key={image.id}className='item-img-container'>
                            <img className='item-detail-image' key={image.id} src={image.url}/>

            </div>

        ))}
        </div>
        <div className='item-info'>

        <h2>{item.name}</h2>
        <span>{item.avgRating}</span>
        <span>{item.price}</span>
        <p>{item.description}</p>
        <button onClick={()=>handleAddToCart(item.id)}>Add to Cart</button>
        </div>
        </div>
        <section>
        <ul className='item-reviews'>
            {console.log(reviews, "REVIEWS HERE")}
            {!sessionUser && (
        //  <button id='review-button' disabled={true}>Sign-in to post a Review</button>
        <div id= 'post-your-review-button'>
                    <OpenModalButton buttonText='Sign-in to post a Review' className='modal-text'onButtonClick={closeMenu} modalComponent={<LoginFormModal/>}/>

        </div>

        )
        }
        {canReview(hasPurchased, hasReviewed, orders, reviews)&&(
            <div id='post-your-review-button'>
            <OpenModalButton id='review-button' disabled={false} buttonText={'Post Your Review'} onButtonClick={closeMenu} style={{alignSelf:'left'}} modalComponent={<ReviewModal itemId={item.id}/>}/>

</div>

        )}
            {reviews.length != 0 && reviews?.map(({ id, ownerId, User, stars, review, createdAt }) => {
                const date = new Date(createdAt);
                const monthName = monthNames[date.getMonth()];
                const year = date.getFullYear();

                console.log(User, "USER")

                return (
                    <li className='review-tile' key={id}>
                        <h4>{User.firstName}</h4>
                        <p className='review-info'>{monthName} {year}</p>
                        <p className='review-info'>{stars} stars</p>
                        <p className='review-info'>{review}</p>
                        {sessionUser!= null && sessionUser.id === ownerId && 
                        (<OpenModalButton id="delete-button" buttonText={'Delete'} onButtonClick={closeMenu} modalComponent={<DeleteReviewModal reviewId={id}/>}/>)}
                    </li>
                );
            })}
        </ul>

        </section>
        
        </>
    )

}
export default ItemDetailPage