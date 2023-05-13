const ItemService = require('../services/item.service');
const AppError = require('../utils/appError');

class ItemController {
  constructor() {
    this.itemService = new ItemService();
  }

  // 거래글 생성
  postItem = async (req, res, next) => {
    try {
      await this.itemService.postItem(req, res);
      res.status(200).json({ message: '판매글이 작성되었습니다.' });
    } catch (error) {
      next(error, req, res, '판매글 작성에 실패하였습니다.');
    }
  };

  getItems = async (req, res, next) => {
    try {
      const { page } = req.body;
      const { user_id, location_id } = res.locals.user;
      const findInfo = { page, location_id, user_id };
      const items = await this.itemService.getItems(findInfo);
      res.status(200).json({ items });
    } catch (error) {
      next(error, req, res, '판매글 조회에 실패하였습니다.');
    }
  };

  getItem = async (req, res, next) => {
    try {
      const { item_id } = req.body;
      const { user_id } = res.locals.user;
      const findInfo = { item_id, user_id };
      const item = await this.itemService.getItem(findInfo);
      res.status(200).json({ item });
    } catch (error) {
      next(error, req, res, '판매글 조회에 실패하였습니다.');
    }
  };

  deleteItem = async (req, res, next) => {
    try {
      const item_id = req.body;
      const user_id = res.locals.user;
      const itemInfo = { item_id, user_id };
      await this.itemService.deleteItem(itemInfo);
    } catch (error) {
      next(error, req, res, '판매글 삭제에 실패하였습니다.');
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const post = await this.itemService.createPost(title, content);
      res.status(201).json({
        success: true,
        message: '판매글이 생성되었습니다.',
        item_id: post.item_id,
      });
    } catch (error) {
      next(error, req, res, '판매글 생성에 실패하였습니다.');
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { item_id } = req.params;
      const { title, content } = req.body;
      await this.itemService.updatePost(item_id, { title, content });
      res.status(200).json({
        success: true,
        message: '판매글이 수정되었습니다.',
      });
    } catch (error) {
      next(error, req, res, '판매글 수정에 실패하였습니다.');
    }
  };

  updateStatus = async (req, res, next) => {
    try {
      const { item_id } = req.params;
      const { status } = req.body;
      await this.itemService.updateStatus(item_id, status);
      res.status(200).json({
        success: true,
        message: '상태가 변경되었습니다.',
      });
    } catch (error) {
      next(error, req, res, '상태 변경에 실패하였습니다.');
    }
  };
}

module.exports = ItemController;
