import React, { useState, useEffect } from 'react'
import { ShopContext } from '../../Context/Shopcontext'
import { useContext } from 'react'
import './cartitem.css'

const CartItem = ({
  id,
  name,
  image,
  price = 0,
  quantity = 1,
  size = '',
  selected = false,
  onSelect = () => {},
  onAdd = () => {},
  onRemove = () => {},
  onDelete = () => {},
  onSetQuantity = () => {},
}) => {
  // If id is provided but no product data, try to get product from context
  const { all_product } = useContext(ShopContext) || {}
  const productFromContext = id && all_product ? all_product.find(p => Number(p.id) === Number(id)) : null

  const displayName = name || (productFromContext && productFromContext.name) || 'Product'
  const displayImage = image || (productFromContext && productFromContext.image) || ''
  const displayPrice = price || (productFromContext && productFromContext.new_price) || 0
  const displayOldPrice = productFromContext?.old_price || 0
  const initialQty = quantity || (productFromContext ? (productFromContext.qty || 1) : 1)

  const [localQty, setLocalQty] = useState(initialQty)
  const [showEditModal, setShowEditModal] = useState(false)
  const [tempQty, setTempQty] = useState(initialQty)
  const [tempSize, setTempSize] = useState(size)

  useEffect(() => setLocalQty(initialQty), [initialQty])

  const handleChange = (e) => {
    const v = e.target.value.replace(/[^0-9]/g, '')
    const num = v === '' ? '' : Math.max(1, Number(v))
    setLocalQty(num)
    if (num !== '') onSetQuantity(id, Number(num))
  }

  const increment = () => {
    const next = Number(localQty || 0) + 1
    setLocalQty(next)
    onAdd(id)
  }

  const decrement = () => {
    if ((localQty || 0) <= 1) return
    const next = Number(localQty) - 1
    setLocalQty(next)
    onRemove(id)
  }

  const handleOpenEdit = () => {
    setTempQty(localQty)
    setTempSize(size)
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    if (tempQty !== localQty) {
      onSetQuantity(id, Number(tempQty))
    }
    setShowEditModal(false)
  }

  const total = (displayPrice * (Number(localQty) || 0)).toFixed(2)
  const savings = displayOldPrice > displayPrice ? ((displayOldPrice - displayPrice) * (Number(localQty) || 0)).toFixed(2) : 0
  const discountPercent = displayOldPrice > displayPrice ? Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100) : 0

  return (
    <>
      <div className="cart-item admin-style" data-id={id}>
        <div className="cart-item-left">
          <input
            type="checkbox"
            className="cart-select"
            checked={selected}
            onChange={(e) => onSelect(id, e.target.checked)}
          />

          <div className="cart-item-image">
            {displayImage ? <img src={displayImage} alt={displayName} /> : <div className="no-image">No Image</div>}
          </div>
        </div>

        <div className="cart-item-main">
          <div className="cart-item-row">
            <div className="cart-item-name">{displayName}</div>
            <div className="cart-item-id">SKU: {id ?? '—'} {size && `• Size: ${size}`}</div>
          </div>

          <div className="cart-item-row bottom">
            <div className="price-block">
              <div className="cart-item-price">Price</div>
              <div className="cart-item-price-group">
                <div className="cart-item-price-value">₹{displayPrice}</div>
                {displayOldPrice > displayPrice && (
                  <div className="cart-item-old-price">₹{displayOldPrice}</div>
                )}
              </div>
              {discountPercent > 0 && (
                <div className="discount-badge">{discountPercent}% OFF</div>
              )}
            </div>

            <div className="qty-block">
              <button className="qty-btn small" onClick={decrement} aria-label="decrease">−</button>
              <input className="qty-input" value={localQty} onChange={handleChange} />
              <button className="qty-btn small" onClick={increment} aria-label="increase">+</button>
              <span className="qty-badge">{localQty}</span>
            </div>

            <div className="subtotal-block">
              <div className="cart-item-subtotal">Subtotal</div>
              <div className="cart-item-subtotal-value">₹{total}</div>
              {savings > 0 && (
                <div className="cart-item-savings">Save ₹{savings}</div>
              )}
            </div>
          </div>
        </div>

        <div className="cart-item-actions">
          <button className="action-btn edit" onClick={handleOpenEdit}>Edit</button>
          <button className="action-btn wishlist" title="Add to wishlist">♥</button>
          <button className="action-btn remove" onClick={() => onDelete(id)}>Remove</button>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Item</h3>
            <div className="modal-field">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={tempQty}
                onChange={(e) => setTempQty(Math.max(1, Number(e.target.value) || 1))}
              />
            </div>
            <div className="modal-field">
              <label>Size</label>
              <div className="size-selector">
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    className={`size-btn ${tempSize === sz ? 'active' : ''}`}
                    onClick={() => setTempSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="modal-btn save" onClick={handleSaveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CartItem