import React from 'react';
import './about.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Page Header */}
      <div className="page-header">
        <h1>Discover Vietnamese Food Culture</h1>
        <p>Experience the harmony of flavors, traditions, and fresh ingredients that define Vietnam's rich culinary heritage.</p>
      </div>

      {/* Culture Section */}
      <section className="culture-section">
        <div className="section-content">
          <div className="text-content">
            <h2>Rich Culinary Traditions</h2>
            <p>
              Vietnamese cuisine is a blend of taste, balance, and symbolism. It reflects a harmony of five flavor profiles—spicy, sour, bitter, salty, and sweet—used to nourish both body and soul.
              Across the regions, flavors differ: Northern dishes are subtle and balanced; Central cuisine is spicy and bold; Southern flavors are sweet and vibrant.
              Meals are often shared and emphasize family, hospitality, and respect.
            </p>
          </div>
          <div className="image-content">
            <img src="https://www.vietnamonline.com/media/uploads/froala_editor/images/VNO-Vietnam%20Food%20Culture%20-%20Things%20To%20Know2_tcHuiMT.jpg" alt="Vietnamese dining culture" />
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="ingredients-section">
        <div className="section-content">
          <div className="image-content">
            <img src="https://scontent.ccdn.cloud/image/vivitravels-en/907e08d5-0ea4-4fbc-9881-1ebbcf026c4d/maxw-960.jpg" alt="Fresh Vietnamese ingredients" />
          </div>
          <div className="text-content">
            <h2>Essential Ingredients of Vietnamese Cuisine</h2>
            <ul>
              <li><strong>Rice:</strong> Found in forms like steamed rice, rice noodles (phở), rice paper, and sticky rice.</li>
              <li><strong>Fish Sauce (Nước Mắm):</strong> The umami-packed backbone of Vietnamese seasoning.</li>
              <li><strong>Herbs:</strong> Mint, basil, cilantro, and perilla bring freshness and complexity.</li>
              <li><strong>Vegetables:</strong> Integral to every meal—often raw, pickled, or lightly cooked.</li>
              <li><strong>Proteins:</strong> Pork, chicken, beef, tofu, and seafood feature heavily in daily meals.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Street Food & Dining Culture */}
      <section className="streetfood-section">
        <div className="section-content">
          <div className="text-content">
            <h2>Street Food & Local Dining Culture</h2>
            <p>
              Street food is at the heart of Vietnamese daily life. From bustling Hanoi alleys to Saigon night markets, locals gather around sidewalk stalls for quick, flavorful meals.
              Signature dishes like <em>phở</em>, <em>bánh mì</em>, <em>bún chả</em>, and <em>gỏi cuốn</em> are not just food—they're experiences.
              Eating is often informal, fast-paced, and deeply communal, reflecting the country's vibrant social culture.
            </p>
          </div>
          <div className="image-content">
            <img src="https://localvietnam.com/wp-content/uploads/2023/06/street-food-vietnam-3-1024x684.jpg" alt="Vietnamese street food" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
