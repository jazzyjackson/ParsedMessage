export NODE_DISABLE_COLORS := 1
export ERROR_LOG_DIRECTORY := /tmp

test-all:
	@for test in `ls tests` ; do \
		node tests/$$test 2> $$ERROR_LOG_DIRECTORY/$$test.log \
			&& echo Completed test $$test && rm $$ERROR_LOG_DIRECTORY/$$test.log \
			|| echo Failed test, see $$ERROR_LOG_DIRECTORY/$$test; \
	done