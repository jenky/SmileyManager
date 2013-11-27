<?php

class Milano_SmileyManager_Deferred_Smilie extends XenForo_Deferred_Abstract
{
	public function execute(array $deferred, array $data, $targetRunTime, &$status)
	{
		XenForo_Model::create('Milano_SmileyManager_Model_Category')->rebuildCategories();
		XenForo_Model::create('XenForo_Model_Smilie')->rebuildSmilieCache();
	
		return true;
	}

	public function canCancel()
	{
		return true;
	}
}