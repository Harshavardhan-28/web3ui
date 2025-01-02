import {formatDate} from "@/lib/utils"
import Link from "next/link";


const SurveyCard = ({ post }: { post : SurveyTypeCard}) => {
    const { _createdAt, author :{ _id:authorId, name},title,category, _id, image } = post;
    return (
        <li className="startup-card group">
          <div className="flex-between">
            <p className="startup_card_date">{formatDate(post._createdAt)}</p>
          </div>
          <div className="flex-between mt-5 gap-5">
            <div className="flex-1">
              
                <p className="text-16-medium line-clamp-1">{authorId?.name}</p>

                <h3 className="text-26-semibold line-clamp-1">{title}</h3>
            </div>
            
          </div>
        
            <img src={image} alt="placeholder" className="startup-card_img" />
    
          <div className="flex-between gap-3 mt-5">
           
              <p className="text-16-medium">{category}</p>
              <Link href={`/startup/${_id}`}>Details</Link>
          </div>
        </li>
      );
    };

export default SurveyCard;